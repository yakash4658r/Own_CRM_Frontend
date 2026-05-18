import { Link } from 'react-router-dom';
import Button from './Button';
import Card from './Card';

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionTo }) {
  return (
    <Card className="py-16 px-8 text-center animate-fade-in">
      {Icon && (
        <div className="mx-auto w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5">
          <Icon className="w-7 h-7 text-zinc-500" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-zinc-500 text-sm mt-2 max-w-sm mx-auto">{description}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="inline-block mt-6">
          <Button>{actionLabel}</Button>
        </Link>
      )}
    </Card>
  );
}
