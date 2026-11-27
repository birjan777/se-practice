type Interval = { start: number; end: number };

type CanBookInput = {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: Interval[];
};

export const MAX_BOOKING_MINUTES = 120;

export type ReasonCode =
  | 'invalid_time' | 'past_time' | 'too_long' | 'room_blocked' | 'overlap' | 'available';

export function availabilityReason({ start, end, now, blocked, bookings }: CanBookInput): ReasonCode {
  if (!(0 <= start && start < end && end <= 1440)) return 'invalid_time';
  if (!(start > now)) return 'past_time';
  if (end - start > MAX_BOOKING_MINUTES) return 'too_long';
  if (blocked) return 'room_blocked';
  for (const b of bookings) {
    if (start < b.end && end > b.start) return 'overlap';
  }
  return 'available';
}

export function canBook(request: CanBookInput): boolean {
  return availabilityReason(request) === 'available';
}
