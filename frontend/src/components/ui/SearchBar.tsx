import React from 'react';
import { Search, Command } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-11 pr-12 py-4 bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-white/10 transition-all shadow-lg text-base"
        placeholder="Search for tools (e.g., 'json', 'pdf', 'converter')..."
      />
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 border border-cyan-500/30 rounded-md bg-cyan-500/10 text-xs text-cyan-400 font-mono">
          <Command className="w-3 h-3" />K
        </kbd>
      </div>
    </div>
  );
}
