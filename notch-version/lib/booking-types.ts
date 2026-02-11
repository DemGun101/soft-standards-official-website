export interface TimeSlot {
  start: string; // ISO 8601
  end: string;   // ISO 8601
  label: string; // e.g. "9:00 AM"
}

export interface DayAvailability {
  date: string;       // YYYY-MM-DD
  available: boolean;
  slots: TimeSlot[];
}

export interface BookingRequest {
  name: string;
  email: string;
  company?: string;
  challenge: string;
  slot: TimeSlot;
  timezone: string;
}

export interface BookingResponse {
  success: boolean;
  eventId?: string;
  error?: string;
}

export interface SlotsResponse {
  month: string;
  days: DayAvailability[];
  timezone: string;
}
