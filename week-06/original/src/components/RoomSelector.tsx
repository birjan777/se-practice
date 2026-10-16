import { MapPin, Users, Ban, CheckCircle2 } from 'lucide-react';
import type { Room } from '../types';

interface Props {
  rooms: Room[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function RoomSelector({ rooms, selectedId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {rooms.map(room => {
        const isSelected = room.id === selectedId;
        return (
          <button
            key={room.id}
            onClick={() => onSelect(room.id)}
            className={`text-left p-3.5 rounded-xl border-2 transition-all duration-200 ${
              isSelected
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-sm text-slate-800 truncate">{room.name}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {room.building}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {room.capacity}
                  </span>
                </div>
              </div>
              {room.blocked ? (
                <span className="flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full whitespace-nowrap">
                  <Ban className="w-3 h-3" /> Blocked
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full whitespace-nowrap">
                  <CheckCircle2 className="w-3 h-3" /> Open
                </span>
              )}
            </div>
            {room.blocked && room.blockReason && (
              <p className="text-xs text-red-500 mt-2 italic">{room.blockReason}</p>
            )}
          </button>
        );
      })}
    </div>
  );
}
