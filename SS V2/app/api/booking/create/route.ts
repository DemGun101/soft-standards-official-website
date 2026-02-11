import { NextRequest, NextResponse } from "next/server";
import { isSlotAvailable, createBookingEvent } from "@/lib/google-calendar";
import type { BookingRequest, BookingResponse } from "@/lib/booking-types";

export async function POST(request: NextRequest) {
  let body: BookingRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." } satisfies BookingResponse,
      { status: 400 }
    );
  }

  // Validate required fields
  if (!body.name?.trim()) {
    return NextResponse.json(
      { success: false, error: "Name is required." } satisfies BookingResponse,
      { status: 400 }
    );
  }

  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { success: false, error: "Valid email is required." } satisfies BookingResponse,
      { status: 400 }
    );
  }

  if (!body.challenge?.trim()) {
    return NextResponse.json(
      { success: false, error: "Please describe your challenge." } satisfies BookingResponse,
      { status: 400 }
    );
  }

  if (!body.slot?.start || !body.slot?.end) {
    return NextResponse.json(
      { success: false, error: "Invalid time slot." } satisfies BookingResponse,
      { status: 400 }
    );
  }

  // Check slot is in the future
  if (new Date(body.slot.start) <= new Date()) {
    return NextResponse.json(
      { success: false, error: "Cannot book a past time slot." } satisfies BookingResponse,
      { status: 400 }
    );
  }

  try {
    // Re-check availability to prevent double-booking
    const available = await isSlotAvailable(body.slot);
    if (!available) {
      return NextResponse.json(
        {
          success: false,
          error: "This slot was just booked. Please select another time.",
        } satisfies BookingResponse,
        { status: 409 }
      );
    }

    const eventId = await createBookingEvent(body);

    return NextResponse.json({
      success: true,
      eventId,
    } satisfies BookingResponse);
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create booking. Please try again." } satisfies BookingResponse,
      { status: 500 }
    );
  }
}
