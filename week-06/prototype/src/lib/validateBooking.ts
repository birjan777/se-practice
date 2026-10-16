import type { Interval, Room } from "./timeUtils";
import { overlaps } from "./timeUtils";

export interface ValidationResult {
  available: boolean;
  reason: string;
}

export const validateInterval = (
  interval: Interval,
  room: Room,
  currentTime: number
): ValidationResult => {
  const { start, end } = interval;

  // AC1: bounds — 0 ≤ start < end ≤ 1440, start after current time
  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    start < 0 ||
    end > 1440 ||
    start >= end
  ) {
    return {
      available: false,
      reason: "Invalid time range. Start must be ≥ 00:00, end ≤ 24:00, and start before end.",
    };
  }

  if (start <= currentTime) {
    return {
      available: false,
      reason: "Start time must be later than the current time.",
    };
  }

  // AC2: max 120 minutes
  if (end - start > 120) {
    return {
      available: false,
      reason: "Booking cannot be longer than 120 minutes.",
    };
  }

  // AC3: room blocked
  if (room.blocked) {
    return {
      available: false,
      reason: `${room.name} is currently blocked and unavailable for booking.`,
    };
  }

  // AC4: no overlapping existing bookings (touching endpoints allowed)
  for (const b of room.bookings) {
    if (overlaps({ start, end }, { start: b.start, end: b.end })) {
      return {
        available: false,
        reason: `Overlaps an existing booking (${fmt(b.start)}–${fmt(b.end)}).`,
      };
    }
  }

  return { available: true, reason: "This room is available for the selected time." };
};

const fmt = (m: number): string => {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${h.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`;
};
