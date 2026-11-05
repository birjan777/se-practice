Run Command
npx vitest run booking.test.ts

Test File (booking.test.ts)
import { describe, it, expect } from 'vitest';
import { canBook } from './booking';

describe('canBook function test suite (AC1–AC5)', () => {
  const DEFAULT_NOW = 540;

  it('T01: 660–720 (touching after) should be allowed', () => {
    const bookings = [{ start: 600, end: 660 }];
    const result = canBook({ start: 660, end: 720, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(true);
  });

  it('T02: 540–570 (starts now) should be rejected', () => {
    const bookings: any[] = [];
    const result = canBook({ start: 540, end: 570, now: 540, blocked: false, bookings });
    expect(result).toBe(false);
  });

  it('T03: 720–720 (zero duration) should be rejected', () => {
    const bookings: any[] = [];
    const result = canBook({ start: 720, end: 720, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(false);
  });

  it('T04: 750–720 (reversed) should be rejected', () => {
    const bookings: any[] = [];
    const result = canBook({ start: 750, end: 720, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(false);
  });

  it('T05: 1380–1441 (past day end) should be rejected', () => {
    const bookings: any[] = [];
    const result = canBook({ start: 1380, end: 1441, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(false);
  });

  it('T06: 720–840 (120 minutes) should be allowed', () => {
    const bookings: any[] = [];
    const result = canBook({ start: 720, end: 840, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(true);
  });

  it('T07: 720–841 (121 minutes) should be rejected', () => {
    const bookings: any[] = [];
    const result = canBook({ start: 720, end: 841, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(false);
  });

  it('T08: 570–600 (touching before) should be allowed', () => {
    const bookings = [{ start: 600, end: 660 }];
    const result = canBook({ start: 570, end: 600, now: DEFAULT_NOW, blocked: false, bookings });
    expect(result).toBe(true);
  });

  it('T09: 630–690 (partial overlap) should be rejected', () => {
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

  it('T13: 660–720, blocked = true should be rejected', () => {
    const bookings: any[] = [];
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

  it('X1: 0–60; now = 0, blocked = false, bookings = [] should be allowed', () => {
    const bookings: any[] = [];
    const result = canBook({ start: 0, end: 60, now: 0, blocked: false, bookings });
    expect(result).toBe(true);
  });

  it('X2: 1380–1440; now = 540, blocked = false, bookings = [] should be allowed', () => {
    const bookings: any[] = [];
    const result = canBook({ start: 1380, end: 1440, now: 540, blocked: false, bookings });
    expect(result).toBe(true);
  });
});

AC Mapping
Acceptance Criteria (AC)	Mapped Test Cases	Description / Rule Verified
AC1	T02, T03, T04, T05, X1, X2	Time boundary validation (now ≤ start < end ≤ 1440).
AC2	T06, T07	Maximum duration constraint (limit ≤ 120 minutes).
AC3	T13	Room block status (blocked = true rejects bookings).
AC4	T01, T08, T09, T10, T11, T12, T14	Overlap checking (touching boundaries allowed, overlapping/identical disallowed).
AC5	AC5, T01, T08	Immutability / returning true without mutating the input bookings array.


Unclear Requirements & Notes
- AC6: As specified, AC6 is evaluated manually in the user interface (UI) rather than via this automated unit test suite. No unhandled ambiguity remains for the unit tests themselves.

