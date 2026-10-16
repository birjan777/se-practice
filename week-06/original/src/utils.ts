import type { Room, Booking, AvailabilityResult } from './types';

export function minutesToTime(mins: number): string {
  const clamped = Math.max(0, Math.min(1440, mins));
  const h = Math.floor(clamped / 60);
  const m = Math.round(clamped % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function formatDuration(mins: number): string {
  if (mins <= 0) return 'Invalid';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

export function checkAvailability(
  room: Room,
  allBookings: Booking[],
  start: number,
  end: number,
  currentTime: number
): AvailabilityResult {
  const violations: string[] = [];

  const intervalValid = start >= 0 && end <= 1440 && start < end;

  if (!intervalValid) {
    violations.push('Interval must satisfy 0 ≤ start < end ≤ 24:00.');
  }

  if (intervalValid && start <= currentTime) {
    violations.push(`Start time must be after the current time (${minutesToTime(currentTime)}).`);
  }

  if (intervalValid && end - start > 120) {
    violations.push(`Booking exceeds the 120-minute limit (requested ${formatDuration(end - start)}).`);
  }

  if (room.blocked) {
    violations.push(`Room is currently blocked${room.blockReason ? ' — ' + room.blockReason : ''}.`);
  }

  if (intervalValid) {
    const overlapping = allBookings.filter(
      b => b.roomId === room.id && start < b.end && end > b.start
    );
    if (overlapping.length > 0) {
      const detail = overlapping
        .map(b => `${minutesToTime(b.start)}–${minutesToTime(b.end)} (${b.purpose})`)
        .join(', ');
      violations.push(`Overlaps with existing booking${overlapping.length > 1 ? 's' : ''}: ${detail}.`);
    }
  }

  return { available: violations.length === 0, violations };
}
