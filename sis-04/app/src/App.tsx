import { useState } from 'react';
import { checkRoom, isDayInterval, type BookingRequest } from './booking';
import { filterRooms } from './filter';
import { ROOMS } from './rooms';

const DEMO_NOW = 9 * 60;
const equipmentOptions = [...new Set(ROOMS.flatMap((room) => room.equipment))].sort();

function toMinutes(value: string) {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

function formatTime(minutes: number) {
  const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
  return `${hours}:${String(minutes % 60).padStart(2, '0')}`;
}

export default function App() {
  const [attendees, setAttendees] = useState('1');
  const [equipment, setEquipment] = useState<string[]>([]);
  const [roomId, setRoomId] = useState('');
  const [start, setStart] = useState('10:00');
  const [end, setEnd] = useState('11:00');
  const [endOfDay, setEndOfDay] = useState(false);
  const [request, setRequest] = useState<BookingRequest | null>(null);

  const matches = filterRooms(ROOMS, { attendees: Number(attendees), equipment });
  const room = matches.find((match) => match.id === roomId) ?? matches[0];

  let feedback = '';
  let feedbackStyle = '';

  if (request && room) {
    if (!Number.isFinite(request.start) || !Number.isFinite(request.end)) {
      feedback = 'Enter a start and an end time.';
      feedbackStyle = 'unavailable';
    } else if (!isDayInterval(request)) {
      feedback = 'The end time must be after the start time.';
      feedbackStyle = 'unavailable';
    } else {
      const available = checkRoom(matches, room.id, request);
      feedback = available ? 'Available' : 'Unavailable';
      feedbackStyle = available ? 'available' : 'unavailable';
    }
  }

  return (
    <main className="page">
      <h1>Smart Campus Room Availability</h1>
      <p className="muted">Demo time <strong>{formatTime(DEMO_NOW)}</strong></p>

      <fieldset>
        <legend>Filter rooms</legend>
        <div className="filters">
          <label className="field">
            Attendees
            <input
              type="number"
              min="0"
              step="1"
              value={attendees}
              onChange={(event) => setAttendees(event.target.value)}
            />
          </label>
          <div>
            <span className="field-name">Required equipment</span>
            <div className="equipment-options">
              {equipmentOptions.map((item) => (
                <label className="choice" key={item}>
                  <input
                    type="checkbox"
                    checked={equipment.includes(item)}
                    onChange={(event) => {
                      const selected = event.target.checked;
                      setEquipment((previous) => selected
                        ? [...previous, item]
                        : previous.filter((value) => value !== item));
                    }}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      {room ? (
        <>
          <fieldset>
            <legend>Matching rooms</legend>
            <div className="room-list">
              {matches.map((match) => (
                <label className="room-card" key={match.id}>
                  <input
                    type="radio"
                    name="room"
                    value={match.id}
                    checked={match.id === room.id}
                    onChange={() => setRoomId(match.id)}
                  />
                  <span>
                    <strong>{match.name}</strong>
                    {match.blocked && <span className="blocked"> · Blocked</span>}
                    <span className="room-details">{match.capacity} seats · {match.equipment.join(', ')}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <form
            onChange={() => setRequest(null)}
            onSubmit={(event) => {
              event.preventDefault();
              setRequest({ start: toMinutes(start), end: endOfDay ? 1440 : toMinutes(end), now: DEMO_NOW });
            }}
          >
            <fieldset>
              <legend>Check availability</legend>
              <div className="time-fields">
                <label className="field">
                  Start
                  <input type="time" value={start} onChange={(event) => setStart(event.target.value)} />
                </label>
                <label className="field">
                  End
                  <input
                    type="time"
                    value={end}
                    disabled={endOfDay}
                    onChange={(event) => setEnd(event.target.value)}
                  />
                </label>
                <label className="choice">
                  <input
                    type="checkbox"
                    checked={endOfDay}
                    onChange={(event) => setEndOfDay(event.target.checked)}
                  />
                  Ends at 24:00
                </label>
              </div>
              <button type="submit">Check availability</button>
              <div role="status">
                {feedback && (
                  <p className={`result ${feedbackStyle}`}>
                    <strong>{feedback}</strong> <span className="muted">· {room.name}</span>
                  </p>
                )}
              </div>
            </fieldset>
          </form>

          <section aria-labelledby="bookings">
            <h2 id="bookings">Existing bookings · {room.name}</h2>
            {room.bookings.length === 0 ? <p className="muted">No existing bookings.</p> : (
              <ul>
                {room.bookings.map((booking) => (
                  <li key={`${booking.start}-${booking.end}`}>
                    {formatTime(booking.start)}–{formatTime(booking.end)}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      ) : (
        <p className="empty" role="status">No rooms match these filters. Try fewer attendees or remove an equipment requirement.</p>
      )}
    </main>
  );
}
