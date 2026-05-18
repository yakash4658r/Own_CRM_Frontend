import { cn } from './cn';
import { statusBadgeClass } from '../../utils/projectHelpers';

export default function Badge({ status, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border',
        statusBadgeClass(status),
        className
      )}
    >
      {status || 'Ongoing'}
    </span>
  );
}
