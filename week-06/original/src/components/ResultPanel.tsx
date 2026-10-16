import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import type { AvailabilityResult } from '../types';
import { minutesToTime, formatDuration } from '../utils';

interface Props {
  result: AvailabilityResult;
  start: number;
  end: number;
  roomName: string;
  visible: boolean;
}

export default function ResultPanel({ result, start, end, roomName, visible }: Props) {
  if (!visible) return null;

  return (
    <div
      className={`animate-fade-in-up rounded-xl border-2 p-5 transition-colors duration-300 ${
        result.available
          ? 'border-emerald-300 bg-emerald-50'
          : 'border-red-300 bg-red-50'
      }`}
    >
      <div className="flex items-start gap-3">
        {result.available ? (
          <CheckCircle2 className="w-7 h-7 text-emerald-600 flex-shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-7 h-7 text-red-600 flex-shrink-0 mt-0.5" />
        )}
        <div className="min-w-0">
          <h3 className={`font-bold text-base ${result.available ? 'text-emerald-700' : 'text-red-700'}`}>
            {result.available ? 'Available' : 'Unavailable'}
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            {result.available
              ? `${roomName} is available from ${minutesToTime(start)} to ${minutesToTime(end)} (${formatDuration(end - start)}).`
              : 'This room cannot be booked for the requested time slot.'}
          </p>

          {!result.available && result.violations.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {result.violations.map((v, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-red-600">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
