import { expect, it } from 'vitest';
import { filterRooms } from './filter';
import type { Room } from './rooms';

const rooms: Room[] = [
  { id: 'small', name: 'Small', capacity: 7, equipment: ['projector'], blocked: false, bookings: [] },
  { id: 'exact', name: 'Exact', capacity: 8, equipment: ['projector', 'whiteboard'], blocked: false, bookings: [] },
  { id: 'large', name: 'Large', capacity: 12, equipment: ['projector'], blocked: true, bookings: [] },
];

it('F1 B5: a room at exact capacity is included', () => {
  expect(filterRooms([rooms[1]], { attendees: 8, equipment: [] })).toEqual([rooms[1]]);
});

it('B6: a room one seat short is excluded', () => {
  expect(filterRooms([rooms[0]], { attendees: 8, equipment: [] })).toEqual([]);
});

it('F2: every requested item must be present', () => {
  expect(filterRooms(rooms, { attendees: 1, equipment: ['projector', 'whiteboard'] })).toEqual([rooms[1]]);
});

it('F4: impossible criteria return no matching rooms', () => {
  expect(filterRooms(rooms, { attendees: 20, equipment: ['whiteboard'] })).toEqual([]);
});

it('no selected equipment keeps all rooms that meet capacity', () => {
  expect(filterRooms(rooms, { attendees: 8, equipment: [] })).toEqual([rooms[1], rooms[2]]);
});
