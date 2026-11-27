import type { ReasonCode } from './booking';

export type ExplainInput = Readonly<{
  roomLabel: string;
  start: string;
  end: string;
  isAvailable: boolean;
  reasonCode: ReasonCode;
}>;

export type ExplanationAdapter = (input: ExplainInput) => unknown;
export type ExplanationResult = { explanation: string; source: 'generated' | 'fallback' };

const reasonFacts: Record<ReasonCode, string> = {
  available: 'the requested time is clear of existing bookings',
  invalid_time: 'the requested time range is invalid',
  past_time: 'the start time must be later than the current time',
  too_long: 'the request exceeds the 120-minute limit',
  room_blocked: 'the room is blocked',
  overlap: 'the requested time overlaps an existing booking',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isReasonCode(value: unknown): value is ReasonCode {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(reasonFacts, value);
}

const clockTime = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

function validateInput(value: unknown): ExplainInput {
  if (!isRecord(value)) throw new Error('An explanation request is required.');
  const { roomLabel, start, end, isAvailable, reasonCode } = value;
  const label = typeof roomLabel === 'string' ? roomLabel.trim() : '';
  if (!label || [...label].length > 60) {
    throw new Error('The room label must contain 1 to 60 characters.');
  }
  if (typeof start !== 'string' || !clockTime.test(start) ||
      typeof end !== 'string' || !(clockTime.test(end) || end === '24:00')) {
    throw new Error('Use HH:MM for both times. Only the end can be 24:00.');
  }
  if (!isReasonCode(reasonCode) || typeof isAvailable !== 'boolean' ||
      isAvailable !== (reasonCode === 'available')) {
    throw new Error('The availability status and reason must match the checker.');
  }
  return Object.freeze({ roomLabel: label, start, end, isAvailable, reasonCode });
}

function statusSentence(input: ExplainInput) {
  return input.isAvailable ? 'The room is available' : 'The room is unavailable';
}

export async function mockAdapter(input: ExplainInput) {
  const slot = input.reasonCode === 'invalid_time' ? '' : ` from ${input.start} to ${input.end}`;
  return { explanation: `${statusSentence(input)}${slot} because ${reasonFacts[input.reasonCode]}.` };
}

function validateOutput(output: unknown, input: ExplainInput): string | undefined {
  if (!isRecord(output) || typeof output.explanation !== 'string') return;
  const text = output.explanation.trim();
  if (!text || [...text].length > 280) return;

  // Accept one or two grounded sentences. Matching whole statements also excludes
  // negations, invented details and instructions hidden after a correct status.
  const normalized = text.toLowerCase();
  const status = statusSentence(input).toLowerCase();
  const reason = reasonFacts[input.reasonCode];
  const slot = ` from ${input.start} to ${input.end}`;
  for (const statement of [status, status + slot]) {
    if (normalized === `${statement} because ${reason}.` ||
        normalized === `${statement}. ${reason}.` ||
        (input.isAvailable && normalized === `${statement}.`)) return text;
  }
}

export async function explainAvailability(
  input: unknown,
  adapter: ExplanationAdapter = mockAdapter,
  timeoutMs = 1500,
): Promise<ExplanationResult> {
  const request = validateInput(input);
  const fallback = {
    source: 'fallback' as const,
    explanation: `${statusSentence(request)} because ${reasonFacts[request.reasonCode]}.`,
  };
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const deadline = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error('Explanation timed out.')), timeoutMs);
    });
    const output = await Promise.race([adapter(request), deadline]);
    const explanation = validateOutput(output, request);
    return explanation ? { source: 'generated', explanation } : fallback;
  } catch {
    return fallback;
  } finally {
    clearTimeout(timer);
  }
}
