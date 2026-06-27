'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

// Add/remove list editor that still submits as a newline-joined value under
// `name` (a hidden textarea) — so the existing server action that splits on
// "\n" keeps working unchanged. Replaces the raw multiline textareas.
export function ListEditor({
  name,
  initial = [],
  placeholder,
}: {
  name: string;
  initial?: string[];
  placeholder?: string;
}) {
  const [items, setItems] = useState<string[]>(initial);
  const [draft, setDraft] = useState('');

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    setItems([...items, v]);
    setDraft('');
  };

  return (
    <div>
      {/* Hidden carrier — keeps the FormData shape the server action expects. */}
      <textarea name={name} value={items.join('\n')} readOnly tabIndex={-1} aria-hidden className="sr-only" />

      {items.length > 0 && (
        <ul className="mb-2 grid gap-1.5">
          {items.map((it, i) => (
            <li
              key={i}
              className="flex items-center gap-2 rounded-lg border border-edge bg-white px-2.5 py-1.5 text-sm text-navy"
            >
              <span className="min-w-0 flex-1 break-words">{it}</span>
              <button
                type="button"
                onClick={() => setItems(items.filter((_, j) => j !== i))}
                className="shrink-0 text-muted transition-colors hover:text-amber"
                aria-label="Ջնջել կետ"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className="hb-in"
        />
        <button
          type="button"
          onClick={add}
          aria-label="Ավելացնել կետ"
          className="shrink-0 rounded-xl border border-edge bg-white px-3 text-navy transition-colors hover:border-teal hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
