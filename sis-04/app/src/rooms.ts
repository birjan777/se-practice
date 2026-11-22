export type Interval = { start: number; end: number };

export type Room = {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  blocked: boolean;
  bookings: Interval[];
};

export const ROOMS: Room[] = [
  {
    id: 'a101',
    name: 'Room A-101',
    capacity: 8,
    equipment: ['projector', 'whiteboard'],
    blocked: false,
    bookings: [{ start: 600, end: 660 }],
  },
  {
    id: 'b204',
    name: 'Room B-204',
    capacity: 12,
    equipment: ['whiteboard'],
    blocked: false,
    bookings: [],
  },
  {
    id: 'c305',
    name: 'Room C-305',
    capacity: 24,
    equipment: ['projector', 'whiteboard', 'video conferencing'],
    blocked: false,
    bookings: [{ start: 780, end: 840 }],
  },
  {
    id: 'd412',
    name: 'Room D-412',
    capacity: 16,
    equipment: ['projector', 'video conferencing'],
    blocked: true,
    bookings: [],
  },
];
