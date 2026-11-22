import type { Interval, Room } from './rooms';

export type BookingRequest = Interval & { now: number };
type CanBookInput = BookingRequest & Pick<Room, 'blocked' | 'bookings'>;

export function isDayInterval({ start, end }: Interval): boolean {
  return 0 <= start && start < end && end <= 1440;
}

export function canBook({ start, end, now, blocked, bookings }: CanBookInput): boolean {
  if (!isDayInterval({ start, end })) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;

  for (const booking of bookings) {
    if (start < booking.end && end > booking.start) return false;
  }
  return true;
}

export function checkRoom(rooms: Room[], roomId: string, request: BookingRequest): boolean {
  const room = rooms.find(({ id }) => id === roomId);
  return room !== undefined && canBook({
    ...request,
    blocked: room.blocked,
    bookings: room.bookings,
  });
}
