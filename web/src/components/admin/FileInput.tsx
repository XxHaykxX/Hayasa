'use client';

import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

// Styled replacement for a raw <input type="file">. Keeps the real input (so
// it submits inside a form / FormData) but hides it behind a dashed dropzone
// that supports click + drag-and-drop and lists the chosen file names.
export function FileInput({
  name,
  label = 'Ընտրել ֆայլեր',
  accept = 'image/*',
  multiple = false,
  required = false,
  hint,
}: {
  name: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  required?: boolean;
  hint?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [names, setNames] = useState<string[]>([]);
  const [over, setOver] = useState(false);

  const sync = () => setNames(Array.from(ref.current?.files ?? []).map((f) => f.name));

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setOver(false);
    if (!ref.current || !e.dataTransfer.files.length) return;
    ref.current.files = e.dataTransfer.files; // assign dropped files to the real input
    sync();
  };

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-5 text-sm font-medium transition-colors ${
          over ? 'border-teal bg-[#EAF6F4] text-teal' : 'border-edge bg-[#FAFCFC] text-muted hover:border-teal hover:text-teal'
        }`}
      >
        <Upload className="h-4 w-4" />
        {names.length > 0 ? `Ընտրված է: ${names.length}` : label}
        <input
          ref={ref}
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          required={required}
          onChange={sync}
          className="sr-only"
        />
      </label>
      {names.length > 0 && (
        <ul className="mt-1.5 space-y-0.5 text-xs text-muted">
          {names.map((n, i) => (
            <li key={i} className="truncate">
              · {n}
            </li>
          ))}
        </ul>
      )}
      {hint && <p className="mt-2 text-xs text-muted">{hint}</p>}
    </div>
  );
}
