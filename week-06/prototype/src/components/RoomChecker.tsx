import { useMemo, useState } from "react";
import { MapPin, Lock, CheckCircle2, XCircle, CalendarClock } from "lucide-react";
import type { Interval } from "@/lib/timeUtils";
import { minutesToLabel } from "@/lib/timeUtils";
import { SAMPLE_ROOMS } from "@/lib/sampleData";
import { validateInterval } from "@/lib/validateBooking";
import Timeline from "./Timeline";

const parseTimeInput = (s: string): number | null => {
  if (!s) return null;
  const [h, m] = s.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
};

const toTimeInput = (m: number): string =>
  `${Math.floor(m / 60).toString().padStart(2, "0")}:${(m % 60).toString().padStart(2, "0")}`;

const DEFAULT_CURRENT = 600; // 10:00

export default function RoomChecker() {
  const [currentMinutes, setCurrentMinutes] = useState(DEFAULT_CURRENT);
  const [startStr, setStartStr] = useState("10:30");
  const [endStr, setEndStr] = useState("11:15");
  const [selectedRoomId, setSelectedRoomId] = useState(SAMPLE_ROOMS[0].id);
  const [touched, setTouched] = useState(false);

  const interval: Interval = useMemo(() => {
    const s = parseTimeInput(startStr);
    const e = parseTimeInput(endStr);
    return { start: s ?? -1, end: e ?? -1 };
  }, [startStr, endStr]);

  const selectedRoom = useMemo(
    () => SAMPLE_ROOMS.find((r) => r.id === selectedRoomId)!,
    [selectedRoomId]
  );

  const result = useMemo(
    () => validateInterval(interval, selectedRoom, currentMinutes),
    [interval, selectedRoom, currentMinutes]
  );

  const showResult = touched || (startStr && endStr);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header card */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-5 flex items-start gap-3">
          <div className="rounded-xl bg-slate-800 p-2.5">
            <CalendarClock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Smart Campus Room Availability</h1>
            <p className="text-sm text-slate-500">Check whether a study room is free for your requested time slot.</p>
          </div>
        </div>

        {/* Current time */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-slate-700">Current time (simulated)</label>
          <div className="flex items-center gap-3">
            <input
              type="time"
              value={toTimeInput(currentMinutes)}
              onChange={(e) => {
                const v = parseTimeInput(e.target.value);
                if (v !== null) setCurrentMinutes(v);
              }}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
            <span className="text-xs text-slate-400">Used to enforce AC1 (start must be after now).</span>
          </div>
        </div>

        {/* Room selector */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Select a room</label>
          <div className="grid gap-2 sm:grid-cols-2">
            {SAMPLE_ROOMS.map((room) => {
              const selected = room.id === selectedRoomId;
              return (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`flex items-center justify-between rounded-lg border p-3 text-left transition ${
                    selected
                      ? "border-slate-800 bg-slate-50 ring-1 ring-slate-800"
                      : "border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{room.name}</p>
                    <p className="flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="h-3 w-3 shrink-0" />
                      {room.location}
                    </p>
                  </div>
                  {room.blocked && (
                    <span className="flex shrink-0 items-center gap-1 rounded bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                      <Lock className="h-3 w-3" /> Blocked
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time inputs */}
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Requested start</label>
            <input
              type="time"
              value={startStr}
              onChange={(e) => {
                setStartStr(e.target.value);
                setTouched(true);
              }}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Requested end</label>
            <input
              type="time"
              value={endStr}
              onChange={(e) => {
                setEndStr(e.target.value);
                setTouched(true);
              }}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
        </div>

        <p className="text-xs text-slate-400">
          Max booking length: 120 minutes. Touching endpoints (e.g. 09:00–10:00 next to 10:00–11:00) are allowed.
        </p>
      </div>

      {/* Timeline */}
      <Timeline
        bookings={selectedRoom.bookings}
        candidateStart={interval.start}
        candidateEnd={interval.end}
        currentTime={currentMinutes}
        available={result.available}
      />

      {/* Existing bookings list */}
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-3 text-sm font-semibold text-slate-700">
          Existing bookings — {selectedRoom.name}
        </h2>
        {selectedRoom.bookings.length === 0 ? (
          <p className="text-sm text-slate-400">No existing bookings for this room.</p>
        ) : (
          <ul className="space-y-1.5">
            {selectedRoom.bookings.map((b) => (
              <li
                key={b.id}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
              >
                <span className="font-medium text-slate-700">
                  {minutesToLabel(b.start)} – {minutesToLabel(b.end)}
                </span>
                <span className="text-xs text-slate-400">{b.user}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Decision panel */}
      {showResult && (
        <div
          className={`rounded-2xl p-5 shadow-sm ring-1 transition ${
            result.available
              ? "bg-emerald-50 ring-emerald-200"
              : "bg-red-50 ring-red-200"
          }`}
        >
          <div className="flex items-start gap-3">
            {result.available ? (
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
            ) : (
              <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
            )}
            <div>
              <p
                className={`text-lg font-bold ${
                  result.available ? "text-emerald-700" : "text-red-700"
                }`}
              >
                {result.available ? "Available" : "Unavailable"}
              </p>
              <p className="mt-0.5 text-sm text-slate-600">{result.reason}</p>
              {!result.available && interval.start >= 0 && interval.end > interval.start && interval.end <= 1440 && (
                <p className="mt-2 text-xs text-slate-400">
                  Booking data is read-only — no changes were made.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
