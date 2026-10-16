import { Clock } from "lucide-react";
import type { Booking } from "@/lib/timeUtils";
import { minutesToLabel } from "@/lib/timeUtils";

interface TimelineProps {
  bookings: Booking[];
  candidateStart: number | null;
  candidateEnd: number | null;
  currentTime: number;
  available: boolean;
}

const DAY_END = 1440;

export default function Timeline({
  bookings,
  candidateStart,
  candidateEnd,
  currentTime,
  available,
}: TimelineProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-600">
        <Clock className="h-4 w-4" />
        Day Timeline (00:00 – 24:00)
      </div>

      {/* Track */}
      <div className="relative h-10 w-full overflow-hidden rounded-lg bg-white ring-1 ring-slate-200">
        {/* Hour gridlines */}
        {Array.from({ length: 24 }, (_, h) => h * 60).map((m) => (
          <div
            key={m}
            className="absolute top-0 bottom-0 border-l border-slate-100"
            style={{ left: `${(m / DAY_END) * 100}%` }}
          />
        ))}

        {/* Existing bookings */}
        {bookings.map((b) => (
          <div
            key={b.id}
            className="absolute top-0 bottom-0 flex items-center justify-center bg-slate-300 text-[10px] font-medium text-slate-700"
            style={{
              left: `${(b.start / DAY_END) * 100}%`,
              width: `${((b.end - b.start) / DAY_END) * 100}%`,
            }}
            title={`${minutesToLabel(b.start)}–${minutesToLabel(b.end)} · ${b.user}`}
          >
            {b.end - b.start > 60 ? `${minutesToLabel(b.start)}` : ""}
          </div>
        ))}

        {/* Current time marker */}
        <div
          className="absolute top-0 bottom-0 z-10 border-l-2 border-slate-400/50"
          style={{ left: `${(currentTime / DAY_END) * 100}%` }}
        >
          <span className="absolute -top-0 -translate-y-full whitespace-nowrap rounded bg-slate-600 px-1 text-[9px] font-semibold text-white">
            Now {minutesToLabel(currentTime)}
          </span>
        </div>

        {/* Candidate interval */}
        {candidateStart !== null && candidateEnd !== null &&
          candidateStart >= 0 && candidateEnd <= DAY_END &&
          candidateStart < candidateEnd && (
            <div
              className={`absolute top-0 bottom-0 z-20 flex items-center justify-center border-2 text-[10px] font-bold ${
                available
                  ? "border-emerald-500 bg-emerald-200/60 text-emerald-800"
                  : "border-red-500 bg-red-200/60 text-red-800"
              }`}
              style={{
                left: `${(candidateStart / DAY_END) * 100}%`,
                width: `${((candidateEnd - candidateStart) / DAY_END) * 100}%`,
              }}
            >
              {candidateEnd - candidateStart > 45 ? "Requested" : ""}
            </div>
          )}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-4 rounded-sm bg-slate-300" /> Existing booking
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`h-3 w-4 rounded-sm border-2 ${
            available
              ? "border-emerald-500 bg-emerald-200/60"
              : "border-red-500 bg-red-200/60"
          }`} /> Requested
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-0 border-l-2 border-slate-400/50" /> Current time
        </span>
      </div>
    </div>
  );
}
