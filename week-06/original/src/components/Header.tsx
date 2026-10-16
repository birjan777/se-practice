import { Building2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center gap-3">
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-md flex-shrink-0">
          <Building2 className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
            Smart Campus Room Availability
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Check if a campus room is available for your time slot
          </p>
        </div>
      </div>
    </header>
  );
}
