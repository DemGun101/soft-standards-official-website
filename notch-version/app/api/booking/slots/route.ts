import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/google-calendar";
import type { SlotsResponse } from "@/lib/booking-types";

export async function GET(request: NextRequest) {
  const month = request.nextUrl.searchParams.get("month");

  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json(
      { error: "Invalid month parameter. Use YYYY-MM format." },
      { status: 400 }
    );
  }

  const [year, mon] = month.split("-").map(Number);
  const now = new Date();
  const currentMonth = now.getFullYear() * 12 + now.getMonth();
  const requestedMonth = year * 12 + (mon - 1);

  // Prevent past months
  if (requestedMonth < currentMonth) {
    return NextResponse.json(
      { error: "Cannot query past months." },
      { status: 400 }
    );
  }

  // Prevent more than 3 months ahead
  if (requestedMonth > currentMonth + 3) {
    return NextResponse.json(
      { error: "Cannot query more than 3 months ahead." },
      { status: 400 }
    );
  }

  try {
    const days = await getAvailableSlots(month);

    const response: SlotsResponse = {
      month,
      days,
      timezone: "America/New_York",
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability." },
      { status: 500 }
    );
  }
}
