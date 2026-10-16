import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { rooms, bookings } from './data';
import { timeToMinutes, checkAvailability, formatDuration, minutesToTime } from './utils';
import Header from './components/Header';
import RoomSelector from './components/RoomSelector';
import Timeline from './components/Timeline';
import ResultPanel from './components/ResultPanel';
import Controls from './components/Controls';

export default function App() {
  const [currentTime, setCurrentTime] = useState(480);
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0].id);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [hasChecked, setHasChecked] = useState(false);

  const selectedRoom = rooms.find(r => r.id === selectedRoomId)!;
  const startMin = timeToMinutes(startTime);
  const endMin = timeToMinutes(endTime);
  const duration = endMin - startMin;
  const roomBookings = bookings.filter(b => b.roomId === selectedRoomId);

  const result = useMemo(
    () => checkAvailability(selectedRoom, bookings, startMin, endMin, currentTime),
    [selectedRoom, bookings, startMin, endMin, currentTime]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Controls */}
          <div className="lg:col-span-2 space-y-5">
            <section className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="font-semibold text-sm text-slate-700 mb-3">Select a Room</h2>
              <RoomSelector
                rooms={rooms}
                selectedId={selectedRoomId}
                onSelect={setSelectedRoomId}
              />
            </section>

            <section className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="font-semibold text-sm text-slate-700 mb-4">Set Your Time Slot</h2>
              <Controls
                currentTime={currentTime}
                onCurrentTimeChange={setCurrentTime}
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
              />

              <div className="mt-4 flex items-center justify-between text-sm border-t border-slate-100 pt-4">
                <span className="text-slate-500">Duration:</span>
                <span
                  className={`font-semibold tabular-nums ${
                    duration <= 0 || duration > 120 ? 'text-red-500' : 'text-emerald-600'
                  }`}
                >
                  {formatDuration(duration)}
                </span>
              </div>

              <button
                onClick={() => setHasChecked(true)}
                className="w-full mt-5 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-600/20"
              >
                <Search className="w-4 h-4" />
                Check Availability
              </button>
            </section>
          </div>

          {/* Right: Timeline + Bookings + Result */}
          <div className="lg:col-span-3 space-y-5">
            <Timeline
              room={selectedRoom}
              bookings={bookings}
              candidateStart={startMin}
              candidateEnd={endMin}
              currentTime={currentTime}
            />

            <section className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-sm text-slate-700 mb-3">
                Existing Bookings — {selectedRoom.name}
              </h3>
              {roomBookings.length === 0 ? (
                <p className="text-sm text-slate-400 italic">No existing bookings for this room.</p>
              ) : (
                <div className="space-y-2">
                  {roomBookings.map(b => (
                    <div
                      key={b.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
                    >
                      <div className="flex-shrink-0 w-1 h-8 bg-blue-500 rounded-full" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-700 truncate">{b.purpose}</p>
                        <p className="text-xs text-slate-400">{b.bookedBy}</p>
                      </div>
                      <span className="text-xs font-semibold text-slate-600 tabular-nums whitespace-nowrap">
                        {minutesToTime(b.start)} – {minutesToTime(b.end)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <ResultPanel
              result={result}
              start={startMin}
              end={endMin}
              roomName={selectedRoom.name}
              visible={hasChecked}
            />

            {!hasChecked && (
              <div className="text-center text-sm text-slate-400 py-8">
                Select a room, set your time slot, and click "Check Availability" to see the result.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
