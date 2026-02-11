import { google } from "googleapis";
import type { TimeSlot, DayAvailability, BookingRequest } from "./booking-types";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const TIMEZONE = "America/New_York";
const BUSINESS_START = 9; // 9 AM ET
const BUSINESS_END = 17;  // 5 PM ET
const SLOT_DURATION = 30; // minutes

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );

  if (!email || !key) {
    throw new Error("Missing Google Calendar service account credentials");
  }

  return new google.auth.JWT({ email, key, scopes: SCOPES });
}

function getCalendarId() {
  return process.env.GOOGLE_CALENDAR_ID || "primary";
}

/**
 * Get the UTC offset string for America/New_York on a given date (handles DST).
 * Returns "-05:00" (EST) or "-04:00" (EDT).
 */
function getETOffset(dateStr: string): string {
  const jan = new Date(`${dateStr.slice(0, 4)}-01-15T12:00:00Z`);
  const jul = new Date(`${dateStr.slice(0, 4)}-07-15T12:00:00Z`);
  const target = new Date(`${dateStr}T12:00:00Z`);

  // Compare formatted hours to detect offset
  const fmt = (d: Date) =>
    parseInt(
      new Intl.DateTimeFormat("en-US", {
        timeZone: TIMEZONE,
        hour: "numeric",
        hour12: false,
      }).format(d)
    );

  const janOffset = jan.getUTCHours() - fmt(jan);
  const julOffset = jul.getUTCHours() - fmt(jul);
  const targetOffset = target.getUTCHours() - fmt(target);

  // Determine which offset is standard (larger = more behind UTC = EST)
  const isDST = targetOffset === Math.min(janOffset, julOffset);
  return isDST ? "-04:00" : "-05:00";
}

/**
 * Generate all possible 30-min slots for a given day within business hours (ET).
 * Creates timezone-aware dates so labels and ISO strings are correct regardless
 * of the server's local timezone.
 */
function generateDaySlots(dateStr: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const offset = getETOffset(dateStr);

  for (let hour = BUSINESS_START; hour < BUSINESS_END; hour++) {
    for (let min = 0; min < 60; min += SLOT_DURATION) {
      if (hour === BUSINESS_END - 1 && min + SLOT_DURATION > 60) continue;

      const hh = String(hour).padStart(2, "0");
      const mm = String(min).padStart(2, "0");

      // Create date with explicit ET offset so it converts to correct UTC
      const start = new Date(`${dateStr}T${hh}:${mm}:00${offset}`);
      const end = new Date(start.getTime() + SLOT_DURATION * 60 * 1000);

      const label = start.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: TIMEZONE,
      });

      slots.push({
        start: start.toISOString(),
        end: end.toISOString(),
        label,
      });
    }
  }

  return slots;
}

/**
 * Query freebusy for a month and return available days + slots.
 */
export async function getAvailableSlots(
  month: string // YYYY-MM
): Promise<DayAvailability[]> {
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });
  const calendarId = getCalendarId();

  const [year, mon] = month.split("-").map(Number);
  const firstDay = new Date(year, mon - 1, 1);
  const lastDay = new Date(year, mon, 0); // last day of month

  const timeMin = firstDay.toISOString();
  const timeMax = new Date(
    lastDay.getFullYear(),
    lastDay.getMonth(),
    lastDay.getDate(),
    23,
    59,
    59
  ).toISOString();

  const freebusy = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      timeZone: TIMEZONE,
      items: [{ id: calendarId }],
    },
  });

  const busyIntervals =
    freebusy.data.calendars?.[calendarId]?.busy || [];

  const now = new Date();
  const days: DayAvailability[] = [];

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, mon - 1, d);
    const dateStr = `${year}-${String(mon).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const dayOfWeek = date.getDay();

    // Skip weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      days.push({ date: dateStr, available: false, slots: [] });
      continue;
    }

    // Skip past days
    if (date < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
      days.push({ date: dateStr, available: false, slots: [] });
      continue;
    }

    const allSlots = generateDaySlots(dateStr);

    // Filter out busy slots
    const availableSlots = allSlots.filter((slot) => {
      const slotStart = new Date(slot.start).getTime();
      const slotEnd = new Date(slot.end).getTime();

      // Also filter past time slots for today
      if (slotStart < now.getTime()) return false;

      return !busyIntervals.some((busy) => {
        const busyStart = new Date(busy.start!).getTime();
        const busyEnd = new Date(busy.end!).getTime();
        return slotStart < busyEnd && slotEnd > busyStart;
      });
    });

    days.push({
      date: dateStr,
      available: availableSlots.length > 0,
      slots: availableSlots,
    });
  }

  return days;
}

/**
 * Check if a specific slot is still available (prevents double-booking).
 */
export async function isSlotAvailable(slot: TimeSlot): Promise<boolean> {
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });
  const calendarId = getCalendarId();

  const freebusy = await calendar.freebusy.query({
    requestBody: {
      timeMin: slot.start,
      timeMax: slot.end,
      timeZone: TIMEZONE,
      items: [{ id: calendarId }],
    },
  });

  const busyIntervals =
    freebusy.data.calendars?.[calendarId]?.busy || [];

  return busyIntervals.length === 0;
}

/**
 * Create a calendar event for a booking.
 */
export async function createBookingEvent(
  booking: BookingRequest
): Promise<string> {
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });
  const calendarId = getCalendarId();

  const description = [
    `Name: ${booking.name}`,
    `Email: ${booking.email}`,
    booking.company ? `Company: ${booking.company}` : null,
    `\nChallenge:\n${booking.challenge}`,
  ]
    .filter(Boolean)
    .join("\n");

  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `Discovery Call — ${booking.name}${booking.company ? ` (${booking.company})` : ""}`,
      description,
      start: {
        dateTime: booking.slot.start,
        timeZone: TIMEZONE,
      },
      end: {
        dateTime: booking.slot.end,
        timeZone: TIMEZONE,
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 60 },
          { method: "popup", minutes: 15 },
        ],
      },
    },
  });

  return event.data.id!;
}
