export interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
  blocked: boolean;
  blockReason?: string;
}

export interface Booking {
  id: string;
  roomId: string;
  start: number;
  end: number;
  bookedBy: string;
  purpose: string;
}

export interface AvailabilityResult {
  available: boolean;
  violations: string[];
}
