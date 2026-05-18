import { ChevronDown } from 'lucide-react';
import { cn } from './cn';

export function Input({ label, className, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-zinc-300">{label}</label>}
      <input className={cn('input-premium', className)} {...props} />
    </div>
  );
}

export function Select({ label, options, className, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-zinc-300">{label}</label>}
      <div className="relative">
        <select className={cn('input-premium appearance-none pr-10', className)} {...props}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
      </div>
    </div>
  );
}

export function Textarea({ label, className, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-zinc-300">{label}</label>}
      <textarea className={cn('input-premium font-mono text-sm resize-y min-h-[100px]', className)} {...props} />
    </div>
  );
}
