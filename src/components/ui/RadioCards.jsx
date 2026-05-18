import { cn } from './cn';

export function RadioCards({ label, name, value, onChange, options, columns = 1 }) {
  return (
    <div className="space-y-3">
      {label && <p className="text-sm font-medium text-zinc-300">{label}</p>}
      <div
        className={cn(
          'grid gap-3',
          columns === 1 && 'grid-cols-1',
          columns === 2 && 'grid-cols-1 sm:grid-cols-2',
          columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        )}
      >
        {options.map((opt) => {
          const selected = value === opt.value;
          const disabled = opt.disabled;
          return (
            <label
              key={opt.value}
              className={cn(
                'relative flex cursor-pointer rounded-xl border p-4 transition-all duration-200',
                disabled && 'opacity-40 cursor-not-allowed',
                selected
                  ? 'border-accent bg-accent/10 shadow-glow-sm'
                  : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]',
                opt.className
              )}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                disabled={disabled}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <span
                className={cn(
                  'mt-0.5 mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
                  selected ? 'border-accent bg-accent' : 'border-zinc-600'
                )}
              >
                {selected && <span className="h-2 w-2 rounded-full bg-vault-950" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn('block font-semibold text-sm', selected ? 'text-accent-light' : 'text-white')}>
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="block text-xs text-zinc-500 mt-1 leading-relaxed">{opt.description}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export function RadioPills({ label, name, value, onChange, options }) {
  return (
    <div className="space-y-3">
      {label && <p className="text-sm font-medium text-zinc-300">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all',
                selected
                  ? 'border-accent bg-accent/15 text-accent-light'
                  : 'border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.15]'
              )}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <span
                className={cn(
                  'h-4 w-4 rounded-full border flex items-center justify-center',
                  selected ? 'border-accent bg-accent' : 'border-zinc-600'
                )}
              >
                {selected && <span className="h-1.5 w-1.5 rounded-full bg-vault-950" />}
              </span>
              {opt.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}
