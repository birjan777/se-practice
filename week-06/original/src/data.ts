import type { Room, Booking } from './types';

export const rooms: Room[] = [
  { id: 'eng-101', name: 'Engineering Hall 101', building: 'Engineering', capacity: 30, blocked: false },
  { id: 'sci-204', name: 'Science Block 204', building: 'Science', capacity: 50, blocked: false },
  { id: 'lib-a', name: 'Library Study Room A', building: 'Library', capacity: 12, blocked: true, blockReason: 'Flood repair' },
  { id: 'bus-305', name: 'Business School 305', building: 'Business', capacity: 40, blocked: false },
  { id: 'arts-1', name: 'Arts Center Studio 1', building: 'Arts', capacity: 25, blocked: true, blockReason: 'Exhibition setup' },
];

export const bookings: Booking[] = [
  { id: 'b1', roomId: 'eng-101', start: 540, end: 630, bookedBy: 'Prof. Chen', purpose: 'Data Structures 201' },
  { id: 'b2', roomId: 'eng-101', start: 840, end: 900, bookedBy: 'Dept. Office', purpose: 'Faculty Meeting' },
  { id: 'b3', roomId: 'sci-204', start: 600, end: 660, bookedBy: 'Prof. Patel', purpose: 'Physics Lab' },
  { id: 'b4', roomId: 'sci-204', start: 780, end: 870, bookedBy: 'Prof. Garcia', purpose: 'Chemistry Seminar' },
  { id: 'b5', roomId: 'bus-305', start: 510, end: 570, bookedBy: 'Prof. Lee', purpose: 'Economics 101' },
  { id: 'b6', roomId: 'bus-305', start: 960, end: 1050, bookedBy: 'Dean Office', purpose: 'MBA Workshop' },
];
