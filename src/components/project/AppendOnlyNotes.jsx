import { Lock } from 'lucide-react';
import { Textarea } from '../ui/FormFields';

export default function AppendOnlyNotes({ label, description, existing, appendValue, onAppendChange, placeholder }) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Lock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-zinc-300">{label}</p>
          {description && <p className="text-xs text-zinc-500 mt-1">{description}</p>}
        </div>
      </div>
      {existing ? (
        <div className="rounded-xl border border-white/[0.08] bg-vault-900/80 p-4">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-2">
            Saved notes (cannot delete)
          </p>
          <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap break-words max-h-48 overflow-y-auto select-text">
            {existing}
          </pre>
        </div>
      ) : (
        <p className="text-xs text-zinc-600 italic">No notes saved yet.</p>
      )}
      <Textarea
        label="Add new note"
        name="append"
        value={appendValue}
        onChange={(e) => onAppendChange(e.target.value)}
        rows={4}
        placeholder={placeholder}
      />
    </div>
  );
}
