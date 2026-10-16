import type { Booking, Room } from '../types';
import { minutesToTime } from '../utils';

interface Props {
  room: Room;
  bookings: Booking[];
  candidateStart: number;
  candidateEnd: number;
  currentTime: number;
}

const toPercent = (mins: number) => `${(mins / 1440) * 100}%`;

export default function Timeline({ room, bookings, candidateStart, candidateEnd, currentTime }: Props) {
  const roomBookings = bookings.filter(b => b.roomId === room.id);
  const candidateValid = candidateStart >= 0 && candidateEnd <= 1440 && candidateStart < candidateEnd;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm text-slate-700">
          Daily Timeline — {room.name}
        </h3>
        <span className="text-xs text-slate-400">00:00 → 24:00</span>
      </div>

      <div className="relative">
        <div className={`relative h-16 rounded-lg overflow-hidden border border-slate-200 ${
          room.blocked ? 'bg-red-50' : 'bg-slate-50'
        }`}>
          {room.blocked && (
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, #ef4444, #ef4444 4px, transparent 4px, transparent 12px)',
              }}
            />
          )}

          {roomBookings.map(b => (
            <div
              key={b.id}
              className="absolute top-1 bottom-1 bg-blue-500/80 rounded-md flex items-center justify-center overflow-hidden"
              style={{ left: toPercent(b.start), width: toPercent(b.end - b.start) }}
              title={`${b.purpose} — ${minutesToTime(b.start)} to ${minutesToTime(b.end)}`}
            >
              <span className="text-[10px] text-white font-medium px-1 truncate hidden sm:block">
                {b.purpose}
              </span>
            </div>
          ))}

          {candidateValid && (
            <div
              className="absolute top-0 bottom-0 border-2 border-dashed border-amber-500 bg-amber-400/20 rounded-md flex items-center justify-center z-5"
              style={{ left: toPercent(candidateStart), width: toPercent(candidateEnd - candidateStart) }}
            >
              <span className="text-[10px] text-amber-700 font-bold px-1 truncate hidden sm:block">
                Your slot
              </span>
            </div>
          )}

          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
            style={{ left: toPercent(currentTime) }}
          >
            <div className="absolute -top-0.5 -left-1 w-2.5 h-2.5 bg-red-500 rounded-full -translate-y-full" />
          </div>
        </div>

        <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 px-0.5">
          {['00:00', '06:00', '12:00', '18:00', '24:00'].map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-blue-500/80 rounded-sm" /> Existing booking
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 border-2 border-dashed border-amber-500 bg-amber-400/20 rounded-sm" /> Your slot
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-0.5 h-3 bg-red-500" /> Current time ({minutesToTime(currentTime)})
        </span>
      </div>
    </div>
  );
}
