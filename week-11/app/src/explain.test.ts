import { afterEach, describe, expect, it, vi } from 'vitest';
import { availabilityReason, canBook } from './booking';
import { explainAvailability, mockAdapter, type ExplainInput } from './explain';

function request(start: string, end: string, blocked = false): ExplainInput {
  const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
  const slot = {
    start: minutes(start), end: minutes(end), now: 540, blocked,
    bookings: [{ start: 600, end: 660 }],
  };
  return {
    roomLabel: 'Room A-101', start, end,
    isAvailable: canBook(slot), reasonCode: availabilityReason(slot),
  };
}

afterEach(() => vi.useRealTimers());

describe('Explain availability', () => {
  it('E1 F1: a request touching the end of a booking is available', async () => {
    const input = request('11:00', '12:00');
    expect(input.reasonCode).toBe('available');
    const result = await explainAvailability(input, mockAdapter);
    expect(result.source).toBe('generated');
    expect(result.explanation).toMatch(/\bavailable\b/i);
  });

  it('E2 F2: an overlap explains the unavailable decision', async () => {
    const input = request('10:30', '11:30');
    expect(input.reasonCode).toBe('overlap');
    const result = await explainAvailability(input, mockAdapter);
    expect(result.explanation).toMatch(/unavailable/i);
    expect(result.explanation).toMatch(/overlap/i);
  });

  it('E3 F2: a blocked room is explained by the blocked-room rule', async () => {
    const input = request('11:00', '12:00', true);
    expect(input.reasonCode).toBe('room_blocked');
    expect((await explainAvailability(input, mockAdapter)).explanation).toMatch(/block/i);
  });

  it('E4 F2: a reversed interval has the invalid_time reason', async () => {
    const input = request('12:30', '12:00');
    expect(input.reasonCode).toBe('invalid_time');
    expect((await explainAvailability(input, mockAdapter)).source).toBe('generated');
  });

  it('E5 F2: an earlier start has the past_time reason', async () => {
    const input = request('08:00', '08:30');
    expect(input.reasonCode).toBe('past_time');
    expect((await explainAvailability(input, mockAdapter)).source).toBe('generated');
  });

  it('E6 F3: a blank room label is rejected before the adapter runs', async () => {
    const adapter = vi.fn(mockAdapter);
    await expect(explainAvailability({ ...request('11:00', '12:00'), roomLabel: ' ' }, adapter)).rejects.toThrow();
    expect(adapter).not.toHaveBeenCalled();
  });

  it('E7 F3: a 500-character label is rejected before the adapter runs', async () => {
    const adapter = vi.fn(mockAdapter);
    await expect(explainAvailability({ ...request('11:00', '12:00'), roomLabel: 'x'.repeat(500) }, adapter)).rejects.toThrow();
    expect(adapter).not.toHaveBeenCalled();
  });

  it('E8 F4: an unanswered request falls back at the timeout', async () => {
    vi.useFakeTimers();
    const input = request('10:30', '11:30');
    const neverAnswers = () => new Promise<never>(() => {});
    const pending = explainAvailability(input, neverAnswers, 40);
    const observer = vi.fn();
    void pending.then(observer);
    await vi.advanceTimersByTimeAsync(39);
    expect(observer).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    const result = await pending;
    expect(result.source).toBe('fallback');
    expect(result.explanation).toMatch(/overlap/i);
    expect(input.isAvailable).toBe(false);
  });

  it('E9 F4: a throwing adapter uses the local reason and preserves status', async () => {
    const input = request('11:00', '12:00');
    const failure = () => { throw new Error('Simulated adapter failure'); };
    const result = await explainAvailability(input, failure);
    expect(result.source).toBe('fallback');
    expect(result.explanation).toMatch(/\bavailable\b/i);
    expect(input.isAvailable).toBe(true);
  });
});
