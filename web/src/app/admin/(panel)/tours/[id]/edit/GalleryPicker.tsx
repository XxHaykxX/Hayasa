'use client';

import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AdminButton } from '@/components/admin/AdminButton';
import { fetchMediaPage, attachGalleryToTour, uploadMedia } from '../../../gallery/actions';
import { attachGalleryToStop } from './stops-actions';

type Item = { id: string; url: string };
type PickerTarget = { type: 'tour'; tourId: string } | { type: 'stop'; stopId: string; tourId: string };

export default function GalleryPicker({ target, compact = false }: { target: PickerTarget; compact?: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [pending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async (p: number, search: string, append: boolean) => {
    setLoading(true);
    try {
      const res = await fetchMediaPage(p, search);
      setItems((prev) => (append ? [...prev, ...res.rows] : res.rows));
      setHasMore(res.hasMore);
      setPage(p);
    } finally {
      setLoading(false);
    }
  }, []);

  // (Re)load the first page whenever the modal opens or the search term changes.
  useEffect(() => {
    if (!open) return;
    void load(1, query, false);
  }, [open, query, load]);

  const close = () => {
    setOpen(false);
    setSel(new Set());
    setItems([]);
    setQ('');
    setQuery('');
    setPage(1);
  };

  const toggle = (url: string) =>
    setSel((prev) => {
      const next = new Set(prev);
      next.has(url) ? next.delete(url) : next.add(url);
      return next;
    });

  // Upload new files straight into the gallery from inside the modal, then
  // refresh the list (newest first) and pre-select what was just uploaded.
  const onUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append('files', f));
    setUploading(true);
    try {
      const res = await uploadMedia({ ok: false }, fd);
      if (!res.ok) {
        toast.error(res.error ?? 'Սխալ');
        return;
      }
      toast.success(`Վերբեռնվեց՝ ${res.uploaded ?? 0}`);
      setQ('');
      setQuery('');
      const fresh = await fetchMediaPage(1, '');
      setItems(fresh.rows);
      setHasMore(fresh.hasMore);
      setPage(1);
      const top = fresh.rows.slice(0, res.uploaded ?? 0).map((r) => r.url);
      setSel((prev) => new Set([...prev, ...top]));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const onAdd = () => {
    const urls = Array.from(sel);
    if (urls.length === 0) return;
    startTransition(async () => {
      const res =
        target.type === 'tour'
          ? await attachGalleryToTour(target.tourId, urls)
          : await attachGalleryToStop(target.stopId, target.tourId, urls);
      if (res.ok) {
        toast.success(`Ավելացվեց՝ ${res.added ?? 0}`);
        close();
        router.refresh();
      } else {
        toast.error(res.error ?? 'Սխալ');
      }
    });
  };

  return (
    <>
      {/* Trigger styled as a drop-zone: clicking it opens the gallery (where you
          can upload new photos and/or pick existing ones). */}
      {compact ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-edge bg-[#FAFCFC] px-4 py-3 text-[13px] font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
        >
          🖼️ Ընտրել կամ վերբեռնել լուսանկար
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-edge bg-[#FAFCFC] px-5 py-7 text-center transition-colors hover:border-teal hover:bg-[#F3FAF9]"
        >
          <span className="text-2xl">🖼️</span>
          <span className="text-sm font-semibold text-navy">Ընտրել կամ վերբեռնել լուսանկար</span>
          <span className="text-xs text-muted">Բացվում է պատկերասրահը — վերբեռնեք նորը կամ ընտրեք եղածներից</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={close}>
          <div
            className="flex max-h-[85vh] w-full max-w-[860px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-edge px-5 py-3.5">
              <h3 className="text-base font-bold text-navy">Պատկերասրահ</h3>
              <button type="button" onClick={close} aria-label="Փակել" className="text-xl leading-none text-muted hover:text-navy">
                ×
              </button>
            </div>

            {/* Upload + search */}
            <div className="flex flex-wrap items-center gap-2.5 border-b border-edge px-5 py-3">
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/avif"
                disabled={uploading}
                onChange={(e) => onUpload(e.target.files)}
                className="block max-w-[260px] text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-teal file:px-3.5 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-dark disabled:opacity-60"
              />
              {uploading && <span className="text-xs text-muted">Վերբեռնում…</span>}
              <span className="mx-1 h-5 w-px bg-edge" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setQuery(q);
                  }
                }}
                placeholder="Որոնում ըստ անվան"
                className="hb-in max-w-[220px]"
              />
              <AdminButton variant="secondary" size="sm" onClick={() => setQuery(q)}>
                Որոնել
              </AdminButton>
              {query && (
                <AdminButton
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setQ('');
                    setQuery('');
                  }}
                >
                  Չեղարկել
                </AdminButton>
              )}
            </div>

            <div className="min-h-[200px] flex-1 overflow-y-auto p-5">
              {items.length === 0 && !loading ? (
                <div className="py-10 text-center text-sm text-muted">{query ? 'Ոչինչ չի գտնվել։' : 'Դատարկ է։ Վերբեռնեք լուսանկար վերևից։'}</div>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-2.5">
                  {items.map((m) => {
                    const active = sel.has(m.url);
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => toggle(m.url)}
                        className={`relative overflow-hidden rounded-lg border-2 transition ${
                          active ? 'border-teal ring-2 ring-teal/40' : 'border-transparent hover:border-edge'
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.url} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
                        {active && (
                          <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal text-[12px] font-bold text-white">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
              {hasMore && (
                <div className="mt-4 flex justify-center">
                  <AdminButton variant="secondary" size="sm" disabled={loading} onClick={() => load(page + 1, query, true)}>
                    {loading ? 'Բեռնում…' : 'Բեռնել ավելին'}
                  </AdminButton>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-edge px-5 py-3.5">
              <span className="text-sm text-muted">Ընտրված՝ {sel.size}</span>
              <div className="flex gap-2.5">
                <AdminButton variant="ghost" onClick={close}>
                  Փակել
                </AdminButton>
                <AdminButton onClick={onAdd} disabled={pending || sel.size === 0}>
                  {pending ? 'Ավելացվում է…' : `Ավելացնել ընտրվածները (${sel.size})`}
                </AdminButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
