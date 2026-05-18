import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = 'Loading vault data...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl animate-pulse-soft" />
        <Loader2 className="w-10 h-10 text-accent animate-spin relative" />
      </div>
      <p className="text-zinc-500 text-sm font-mono">{message}</p>
    </div>
  );
}
