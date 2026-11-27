import { useState } from 'react';
import { ROOM, checkRoomAvailability } from './roomAvailability';

const fmt = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

export default function App() {
  const [now, setNow] = useState('09:00');
  const [blocked, setBlocked] = useState(false);
  const [start, setStart] = useState('11:00');
  const [end, setEnd] = useState('12:00');
  const [endOfDay, setEndOfDay] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  function check() {
    const outcome = checkRoomAvailability({
      start, end, now, endOfDay, blocked, bookings: ROOM.bookings,
    });
    setError(outcome.error);
    setResult(outcome.available);
  }

  return (
    <main className="page">
      <h1>Smart Campus Room Availability</h1>

      <div className="row">
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

      {error && <p className="error">{error}</p>}

      {result !== null && (
        <p className={`result ${result ? 'available' : 'unavailable'}`}>
          {result ? 'Available' : 'Unavailable'}
        </p>
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
