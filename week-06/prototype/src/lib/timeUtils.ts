export interface Interval {
  start: number;
  end: number;
}

export interface Booking {
  id: string;
  start: number;
  end: number;
  user: string;
}

export interface Room {
  id: string;
  name: string;
  location: string;
  blocked: boolean;
  bookings: Booking[];
}

export const minutesToLabel = (m: number): string => {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${h.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`;
};

export const clamp = (n: number, min: number, max: number): number =>
  Math.min(Math.max(n, min), max);

export const overlaps = (a: Interval, b: Interval): boolean =>
  a.start < b.end && b.start < a.end;
