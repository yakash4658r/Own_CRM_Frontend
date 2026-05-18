import { cn } from './cn';
import Card from './Card';

const accentMap = {
  blue: 'from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/20',
  emerald: 'from-accent/20 to-accent/5 text-accent-light border-accent/25',
  amber: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/20',
  red: 'from-red-500/20 to-red-600/5 text-red-400 border-red-500/20',
  violet: 'from-violet-500/20 to-violet-600/5 text-violet-400 border-violet-500/20',
};

export default function StatCard({ icon: Icon, label, value, accent = 'emerald', delay = 0 }) {
  return (
    <Card
      className={cn('p-5 animate-slide-up', `stagger-${delay}`)}
      style={{ animationDelay: `${delay}ms` }}
      hover
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'p-3 rounded-xl border bg-gradient-to-br shrink-0',
            accentMap[accent]
          )}
        >
          <Icon className="w-5 h-5" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider truncate">{label}</p>
          <p className="text-xl sm:text-2xl font-bold text-white mt-1 font-mono truncate">{value}</p>
        </div>
      </div>
    </Card>
  );
}
