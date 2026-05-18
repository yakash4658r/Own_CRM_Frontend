import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from './cn';

export default function PageHeader({
  title,
  subtitle,
  backTo,
  action,
  className,
}) {
  return (
    <div className={cn('flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between animate-slide-up', className)}>
      <div className="flex items-start gap-4">
        {backTo && (
          <Link to={backTo} className="btn-ghost mt-0.5 shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        )}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gradient">{title}</h1>
          {subtitle && <p className="text-zinc-400 text-sm mt-2 max-w-xl leading-relaxed">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
