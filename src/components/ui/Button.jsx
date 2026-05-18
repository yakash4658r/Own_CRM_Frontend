import { cn } from './cn';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger:
    'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all',
};

export default function Button({
  variant = 'primary',
  className,
  children,
  ...props
}) {
  return (
    <button className={cn(variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
