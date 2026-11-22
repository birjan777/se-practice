import { describe, it, expect } from 'vitest';
import { canBook, checkRoom } from './booking';
import { filterRooms } from './filter';
import type { Room } from './rooms';

describe('canBook function test suite (AC1–AC5)', () => {
  const DEFAULT_NOW = 540;

  it('T01 B3 AC4: 660–720 (touching after) should be allowed', () => {
    const bookings = [{ start: 600, end: 660 }];
    const result = canBook({ start: 660, end: 720, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(true);
  });

  it('T02 AC1: 540–570 (starts now) should be rejected', () => {
    const bookings = [{ start: 600, end: 660 }];
    const result = canBook({ start: 540, end: 570, now: 540, blocked: false, bookings });
    expect(result).toBe(false);
  });


  it('T03: 720–720 (zero duration) should be rejected', () => {
    const bookings = [{ start: 600, end: 660 }];
    const result = canBook({ start: 720, end: 720, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(false);
  });

  it('T04: 750–720 (reversed) should be rejected', () => {
    const bookings = [{ start: 600, end: 660 }];
    const result = canBook({ start: 750, end: 720, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(false);
  });

  it('T05: 1380–1441 (past day end) should be rejected', () => {
    const bookings = [{ start: 600, end: 660 }];
    const result = canBook({ start: 1380, end: 1441, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(false);
  });

  it('T06 B1 AC2: 720–840 (120 minutes) should be allowed', () => {
    const bookings = [{ start: 600, end: 660 }];
    const result = canBook({ start: 720, end: 840, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(true);
  });

  it('T07 B2: 720–841 (121 minutes) should be rejected', () => {
    const bookings = [{ start: 600, end: 660 }];
    const result = canBook({ start: 720, end: 841, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(false);
  });

  it('T08: 570–600 (touching before) should be allowed', () => {
    const bookings = [{ start: 600, end: 660 }];
    const result = canBook({ start: 570, end: 600, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(true);
  });

  it('T09 B4: 630–690 (partial overlap) should be rejected', () => {
    const bookings = [{ start: 600, end: 660 }];
    const result = canBook({ start: 630, end: 690, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(false);
  });

  it('T10: 570–690 (contains booking) should be rejected', () => {
    const bookings = [{ start: 600, end: 660 }];
    const result = canBook({ start: 570, end: 690, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(false);
  });

  it('T11: 615–645 (inside booking) should be rejected', () => {
    const bookings = [{ start: 600, end: 660 }];
    const result = canBook({ start: 615, end: 645, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(false);
  });

  it('T12: 600–660 (identical interval) should be rejected', () => {
    const bookings = [{ start: 600, end: 660 }];
    const result = canBook({ start: 600, end: 660, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(false);
  });

  it('T13 AC3: 660–720, blocked = true should be rejected', () => {
    const bookings = [{ start: 600, end: 660 }];
    const result = canBook({ start: 660, end: 720, now: DEFAULT_NOW, blocked: true, bookings });
    expect(result).toBe(false);
  });

  it('T14: 630–690, bookings = [] should be allowed', () => {
    const bookings: any[] = [];
    const result = canBook({ start: 630, end: 690, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(true);
  });

  it('AC5: Available request leaves bookings array unchanged', () => {
    const bookings = [{ start: 800, end: 860 }];
    const initialBookings = JSON.parse(JSON.stringify(bookings));
    const result = canBook({ start: 660, end: 720, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(true);
    expect(bookings).toEqual(initialBookings);
  });

  it('X1: 0–60; now = 0, blocked = false, bookings = [] should be rejected', () => {
    const bookings: any[] = [];
    const result = canBook({ start: 0, end: 60, now: 0, blocked: false, bookings });
    expect(result).toBe(false);
  });

  it('X2: 1380–1440; now = 540, blocked = false, bookings = [] should be allowed', () => {
    const bookings: any[] = [];
    const result = canBook({ start: 1380, end: 1440, now: 540, blocked: false, bookings });
    expect(result).toBe(true);
  });

  it("BUG-A: allows a request touching bookings at both ends", () => {
    const bookings = [
      { start: 540, end: 600 },
      { start: 660, end: 720 },
    ];

    const result = canBook({
      start: 600,
      end: 660,
      now: DEFAULT_NOW,
      blocked: false,
      bookings,
    });

    expect(result).toBe(true);
  });

  it("BUG-B: leaves bookings unchanged for an available request", () => {
    const bookings = [{ start: 600, end: 660 }];
    const before = [...bookings];

    const result = canBook({
      start: 720,
      end: 780,
      now: DEFAULT_NOW,
      blocked: false,
      bookings,
    });

    expect(result).toBe(true);
    expect(bookings).toEqual(before);
  });

});

describe('room-specific availability', () => {
  const rooms: Room[] = [
    { id: 'free', name: 'Free', capacity: 8, equipment: ['projector'], blocked: false, bookings: [] },
    {
      id: 'busy',
      name: 'Busy',
      capacity: 12,
      equipment: ['projector', 'whiteboard'],
      blocked: false,
      bookings: [{ start: 630, end: 690 }],
    },
    { id: 'blocked', name: 'Blocked', capacity: 8, equipment: ['projector'], blocked: true, bookings: [] },
  ];
  const request = { start: 600, end: 660, now: 540 };

  it('F3: a blocked room is unavailable even with no bookings', () => {
    expect(checkRoom(rooms, 'blocked', request)).toBe(false);
  });

  it('F5: the same slot can be free in one room and busy in another', () => {
    expect(checkRoom(rooms, 'free', request)).toBe(true);
    expect(checkRoom(rooms, 'busy', request)).toBe(false);
  });

  it('an unknown room is unavailable', () => {
    expect(checkRoom(rooms, 'missing', request)).toBe(false);
  });

  it('INT: the filtered room is checked against its own bookings', () => {
    const matches = filterRooms(rooms, { attendees: 8, equipment: ['whiteboard'] });
    expect(matches.map((room) => room.id)).toEqual(['busy']);
    expect(checkRoom(matches, matches[0].id, request)).toBe(false);
    expect(matches[0].bookings).toEqual([{ start: 630, end: 690 }]);
  });
});
