import { Clock } from 'lucide-react';
import { minutesToTime } from '../utils';

interface Props {
  currentTime: number;
  onCurrentTimeChange: (mins: number) => void;
  startTime: string;
  endTime: string;
  onStartTimeChange: (val: string) => void;
  onEndTimeChange: (val: string) => void;
}

export default function Controls({
  currentTime,
  onCurrentTimeChange,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: Props) {
  return (
    <div className="space-y-5">
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
          <Clock className="w-4 h-4 text-slate-400" />
          Current Time
          <span className="ml-auto text-blue-600 font-bold tabular-nums">
            {minutesToTime(currentTime)}
          </span>
        </label>
        <input
          type="range"
          min={0}
          max={1440}
          step={5}
          value={currentTime}
          onChange={e => onCurrentTimeChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Requested Start
          </label>
          <input
            type="time"
            value={startTime}
            onChange={e => onStartTimeChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-slate-800 font-medium tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Requested End
          </label>
          <input
            type="time"
            value={endTime}
            onChange={e => onEndTimeChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-slate-800 font-medium tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <p className="text-xs text-slate-400">
        Maximum booking duration is 2 hours. Times are in 24-hour format.
      </p>
    </div>
  );
}
