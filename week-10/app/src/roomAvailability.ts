import { canBook } from './booking';

export const ROOM = {
  id: 'a101',
  name: 'Room A-101',
  bookings: [{ start: 600, end: 660 }],
};

type AvailabilityRequest = {
  start: string;
  end: string;
  now: string;
  endOfDay: boolean;
  blocked: boolean;
  bookings: Parameters<typeof canBook>[0]['bookings'];
};

type AvailabilityResult = { available: boolean | null; error: string };

function toMinutes(value: string): number {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

export function checkRoomAvailability({
  start,
  end,
  now,
  endOfDay,
  blocked,
  bookings,
}: AvailabilityRequest): AvailabilityResult {
  if (!start || !now || (!end && !endOfDay)) {
    return { available: null, error: 'Fill in the current time, the start and the end.' };
  }

  const startMinutes = toMinutes(start);
  const endMinutes = endOfDay ? 1440 : toMinutes(end);
  if (!(startMinutes < endMinutes)) {
    return { available: null, error: 'The end time must be after the start time.' };
  }

  const available = canBook({
    start: startMinutes,
    end: endMinutes,
    now: toMinutes(now),
    blocked,
    bookings,
  });

  return { available, error: '' };
}
