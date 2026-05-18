import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from './cn';

export default function Alert({ type = 'error', children, className }) {
  const styles = {
    error: 'bg-red-500/10 border-red-500/25 text-red-300',
    success: 'bg-accent/10 border-accent/25 text-accent-light',
  };

  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;

  return (
    <div className={cn('flex items-start gap-3 px-4 py-3 rounded-xl border text-sm', styles[type], className)}>
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div>{children}</div>
    </div>
  );
}
