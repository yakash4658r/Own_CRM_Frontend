import { cn } from './cn';

export default function Card({ className, children, hover = false, ...props }) {
  return (
    <div
      className={cn(
        hover ? 'glass-panel-hover rounded-2xl' : 'glass-panel rounded-2xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
