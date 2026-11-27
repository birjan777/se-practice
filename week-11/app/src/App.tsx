import { useRef, useState } from 'react';
import { ROOM, checkRoomAvailability } from './roomAvailability';
import { explainAvailability, mockAdapter, type ExplainInput, type ExplanationResult } from './explain';

const fmt = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

function failingAdapter(): never {
  throw new Error('Simulated adapter failure.');
}

export default function App() {
  const [now, setNow] = useState('09:00');
  const [blocked, setBlocked] = useState(false);
  const [start, setStart] = useState('11:00');
  const [end, setEnd] = useState('12:00');
  const [endOfDay, setEndOfDay] = useState(false);
  const [result, setResult] = useState<ExplainInput | null>(null);
  const [error, setError] = useState('');
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [explanation, setExplanation] = useState<ExplanationResult | null>(null);
  const [pending, setPending] = useState(false);
  const [explainError, setExplainError] = useState('');
  const generation = useRef(0);

  function clearExplanation() {
    generation.current += 1;
    setPending(false);
    setExplainError('');
    setExplanation(null);
  }

  function clearCheck() {
    clearExplanation();
    setResult(null);
    setError('');
  }

  function check() {
    clearExplanation();
    const outcome = checkRoomAvailability({
      start, end, now, endOfDay, blocked, bookings: ROOM.bookings,
    });
    setError(outcome.error);
    setResult(outcome.available === null ? null : {
      roomLabel: ROOM.name,
      start,
      end: endOfDay ? '24:00' : end,
      isAvailable: outcome.available,
      reasonCode: outcome.reasonCode,
    });
  }

  async function explain() {
    if (!result) return;
    clearExplanation();
    const requestId = generation.current;
    setPending(true);
    try {
      const answer = await explainAvailability(result, simulateFailure ? failingAdapter : mockAdapter);
      if (requestId === generation.current) setExplanation(answer);
    } catch (err) {
      if (requestId === generation.current) {
        setExplainError(err instanceof Error ? err.message : 'Check the request and try again.');
      }
    } finally {
      if (requestId === generation.current) setPending(false);
    }
  }

  return (
    <main className="page">
      <h1>Smart Campus Room Availability</h1>

      <div className="row" onChange={clearCheck}>
        <label>
          Room
          <select defaultValue={ROOM.id}>
            <option value={ROOM.id}>{ROOM.name}</option>
          </select>
        </label>

        <label>
          Current time
          <input type="time" value={now} onChange={(e) => setNow(e.target.value)} />
        </label>

        <label>
          Start
          <input type="time" value={start} onChange={(e) => setStart(e.target.value)} />
        </label>

        <label>
          End
          <input
            type="time"
            value={end}
            disabled={endOfDay}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>

        <label className="inline">
          <input
            type="checkbox"
            checked={endOfDay}
            onChange={(e) => setEndOfDay(e.target.checked)}
          />
          Ends at 24:00
        </label>

        <label className="inline">
          <input
            type="checkbox"
            checked={blocked}
            onChange={(e) => setBlocked(e.target.checked)}
          />
          Room blocked
        </label>
      </div>

      <button onClick={check}>Check availability</button>

      {error && <p className="error" role="alert">{error}</p>}

      {result !== null && (
        <>
          <p className={`result ${result.isAvailable ? 'available' : 'unavailable'}`} role="status">
            Confirmed status: {result.isAvailable ? 'Available' : 'Unavailable'}
          </p>
          <section className="explanation" aria-label="Availability explanation">
            <button onClick={explain} disabled={pending}>Explain availability</button>
            <label className="failure-option">
              <input
                type="checkbox"
                checked={simulateFailure}
                onChange={(e) => {
                  clearExplanation();
                  setSimulateFailure(e.target.checked);
                }}
              />
              Simulate API failure
            </label>
            <div aria-live="polite">
              {pending && <p>Preparing explanation…</p>}
              {explainError && <p className="error">{explainError}</p>}
              {explanation && (
                <p>
                  <strong>{explanation.source === 'fallback'
                    ? 'Local fallback explanation'
                    : 'Generated explanation (mock)'}</strong>
                  <br />{explanation.explanation}
                </p>
              )}
            </div>
          </section>
        </>
      )}

      <h2>Existing bookings</h2>
      <ul>
        {ROOM.bookings.length ? (
          ROOM.bookings.map((b, i) => (
            <li key={i}>
              {fmt(b.start)}–{fmt(b.end)}
            </li>
          ))
        ) : (
          <li>none</li>
        )}
      </ul>
    </main>
  );
}
