'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AdminButton } from '@/components/admin/AdminButton';
import { useConfirm } from '@/components/admin/ConfirmProvider';
import type { MediaAsset, MediaFolder } from '@/lib/admin-media';
import {
  uploadMedia,
  deleteMedia,
  createFolder,
  renameFolder,
  deleteFolder,
  moveMediaToFolder,
  renameMedia,
  type MediaActionState,
} from './actions';

const initial: MediaActionState = { ok: false };

function UploadButton() {
  const { pending } = useFormStatus();
  return (
    <AdminButton type="submit" disabled={pending}>
      {pending ? 'Վերբեռնում…' : 'Վերբեռնել'}
    </AdminButton>
  );
}

export default function GalleryClient({
  rows,
  page,
  totalPages,
  q,
  folder,
  folders,
  counts,
  noneCount,
  totalAll,
}: {
  rows: MediaAsset[];
  page: number;
  totalPages: number;
  q: string;
  folder: string;
  folders: MediaFolder[];
  counts: Record<string, number>;
  noneCount: number;
  totalAll: number;
}) {
  const router = useRouter();
  const confirm = useConfirm();
  const [pending, startTransition] = useTransition();
  const [state, action] = useFormState(uploadMedia, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const [sel, setSel] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (state.ok && state.uploaded) {
      toast.success(`Վերբեռնվեց՝ ${state.uploaded}`);
      formRef.current?.reset();
      router.refresh();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  // Drop selection when the page/folder changes.
  useEffect(() => setSel(new Set()), [folder, page, q]);

  const activeFolder = folders.find((f) => f.id === folder) ?? null;

  const run = (fn: () => Promise<{ ok: boolean; error?: string }>, okMsg: string) =>
    startTransition(async () => {
      const res = await fn();
      if (res.ok) {
        toast.success(okMsg);
        router.refresh();
      } else {
        toast.error(res.error ?? 'Սխալ');
      }
    });

  const toggle = (id: string) =>
    setSel((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const onCreateFolder = () => {
    const name = window.prompt('Նոր պանակի անունը:');
    if (name && name.trim()) run(() => createFolder(name), 'Պանակը ստեղծվեց');
  };
  const onRenameFolder = () => {
    if (!activeFolder) return;
    const name = window.prompt('Նոր անունը:', activeFolder.name);
    if (name && name.trim() && name.trim() !== activeFolder.name) run(() => renameFolder(activeFolder.id, name), 'Վերանվանվեց');
  };
  const onDeleteFolder = async () => {
    if (!activeFolder) return;
    const ok = await confirm({
      title: `Ջնջե՞լ «${activeFolder.name}» պանակը`,
      body: 'Լուսանկարները չեն ջնջվի — կտեղափոխվեն արմատ:',
      confirmLabel: 'Ջնջել',
      destructive: true,
    });
    if (ok) run(() => deleteFolder(activeFolder.id), 'Պանակը ջնջվեց');
  };
  const onRenamePhoto = (m: MediaAsset) => {
    const name = window.prompt('Լուսանկարի անունը:', m.name ?? '');
    if (name !== null) run(() => renameMedia(m.id, name), 'Վերանվանվեց');
  };
  const onDeletePhoto = async (m: MediaAsset) => {
    const ok = await confirm({ title: 'Ջնջե՞լ լուսանկարը', confirmLabel: 'Ջնջել', destructive: true });
    if (ok) {
      const res = await new Promise<{ ok: boolean; error?: string }>((resolve) =>
        startTransition(async () => resolve(await deleteMedia(m.id))),
      );
      if (res.ok) {
        toast.success('Ջնջվեց');
        router.refresh();
      } else {
        toast.error(res.error ?? 'Սխալ');
      }
    }
  };
  const onMove = (folderId: string | null) => {
    const ids = Array.from(sel);
    if (ids.length === 0) return;
    run(() => moveMediaToFolder(ids, folderId), 'Տեղափոխվեց');
  };
  const copy = (url: string) =>
    navigator.clipboard?.writeText(url).then(
      () => toast.success('Հղումը պատճենվեց'),
      () => toast.error('Չհաջողվեց պատճենել'),
    );

  const link = (params: Record<string, string | number | undefined>) => {
    const sp = new URLSearchParams();
    const merged = { q, folder, page, ...params };
    if (merged.q) sp.set('q', String(merged.q));
    if (merged.folder) sp.set('folder', String(merged.folder));
    if (merged.page && Number(merged.page) > 1) sp.set('page', String(merged.page));
    const s = sp.toString();
    return `/admin/gallery${s ? `?${s}` : ''}`;
  };
  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
      active ? 'border-teal bg-teal text-white' : 'border-edge bg-white text-navy hover:border-teal'
    }`;

  return (
    <div>
      {/* Folder bar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <a href={link({ folder: '', page: 1 })} className={chip(folder === '')}>
          Բոլորը ({totalAll})
        </a>
        <a href={link({ folder: 'none', page: 1 })} className={chip(folder === 'none')}>
          Առանց պանակի ({noneCount})
        </a>
        {folders.map((f) => (
          <a key={f.id} href={link({ folder: f.id, page: 1 })} className={chip(folder === f.id)}>
            📁 {f.name} ({counts[f.id] ?? 0})
          </a>
        ))}
        <button
          type="button"
          onClick={onCreateFolder}
          className="rounded-full border border-dashed border-edge px-3 py-1.5 text-[13px] font-medium text-muted hover:border-teal hover:text-teal"
        >
          + Նոր պանակ
        </button>
        {activeFolder && (
          <>
            <button type="button" onClick={onRenameFolder} className="text-[13px] font-medium text-teal hover:text-teal-dark">
              Վերանվանել
            </button>
            <button type="button" onClick={onDeleteFolder} className="text-[13px] font-medium text-[#C0564B] hover:underline">
              Ջնջել պանակը
            </button>
          </>
        )}
      </div>

      {/* Upload + search */}
      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <form ref={formRef} action={action} className="flex items-center gap-2.5">
          <input
            type="file"
            name="files"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="block max-w-[300px] text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-teal file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-dark"
          />
          {/* Uploads land in the currently opened folder (if a real one). */}
          <input type="hidden" name="folder" value={activeFolder ? activeFolder.id : ''} />
          <UploadButton />
        </form>
        <form method="get" className="flex items-center gap-2.5">
          {folder && <input type="hidden" name="folder" value={folder} />}
          <input name="q" defaultValue={q} placeholder="Որոնում ըստ անվան" className="hb-in max-w-[220px]" />
          <AdminButton type="submit" variant="secondary">
            Որոնել
          </AdminButton>
          {q && (
            <AdminButton variant="ghost" href={link({ q: '', page: 1 })}>
              Չեղարկել
            </AdminButton>
          )}
        </form>
      </div>

      {/* Bulk actions */}
      {sel.size > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-2.5 rounded-xl border border-edge bg-aqua px-4 py-2.5">
          <span className="text-sm font-semibold text-navy">Ընտրված՝ {sel.size}</span>
          <span className="ml-auto text-sm text-muted">Տեղափոխել՝</span>
          <select
            className="hb-in w-auto"
            defaultValue=""
            onChange={(e) => {
              const v = e.target.value;
              e.target.value = '';
              if (v === '') return;
              onMove(v === 'none' ? null : v);
            }}
          >
            <option value="">— ընտրել պանակ —</option>
            <option value="none">Արմատ (առանց պանակի)</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => setSel(new Set())} className="text-[13px] text-muted hover:text-navy">
            Չեղարկել ընտրությունը
          </button>
        </div>
      )}

      <p className="mb-4 text-xs text-muted">
        Բոլոր լուսանկարները՝ 16:10 համամասնությամբ, WebP. Տուրում օգտագործվող լուսանկարը ջնջել չի կարելի.
        Վերանվանումը փոխում է միայն անունը (հղումը՝ ոչ).
      </p>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-edge bg-white p-10 text-center text-muted">
          {q ? 'Ոչինչ չի գտնվել։' : 'Դատարկ է։ Վերբեռնեք լուսանկար։'}
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
          {rows.map((m) => {
            const selected = sel.has(m.id);
            return (
              <div
                key={m.id}
                className={`group relative overflow-hidden rounded-xl border bg-white ${selected ? 'border-teal ring-2 ring-teal/40' : 'border-edge'} ${pending ? 'opacity-70' : ''}`}
              >
                <label className="absolute left-1.5 top-1.5 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-white/85">
                  <input type="checkbox" checked={selected} onChange={() => toggle(m.id)} aria-label="Ընտրել" />
                </label>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.name ?? ''} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-1 bg-gradient-to-t from-black/60 to-transparent p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <button type="button" onClick={() => onRenamePhoto(m)} title="Վերանվանել" className="rounded bg-white/90 px-2 py-1 text-[11px] font-semibold text-navy hover:bg-white">
                    ✎
                  </button>
                  <button type="button" onClick={() => copy(m.url)} title="Պատճենել հղումը" className="rounded bg-white/90 px-2 py-1 text-[11px] font-semibold text-navy hover:bg-white">
                    Հղում
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeletePhoto(m)}
                    disabled={pending}
                    title="Ջնջել"
                    aria-label="Ջնջել լուսանկարը"
                    className="rounded-full bg-[#C0564Bee] px-2 py-1 text-[12px] leading-none text-white disabled:opacity-60"
                  >
                    ×
                  </button>
                </div>
                {m.name && (
                  <div className="truncate px-2 py-1.5 text-[11px] text-muted" title={m.name}>
                    {m.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <AdminButton variant="secondary" size="sm" href={page > 1 ? link({ page: page - 1 }) : undefined} disabled={page <= 1}>
            ← Նախորդ
          </AdminButton>
          <span className="text-sm text-muted">
            {page} / {totalPages}
          </span>
          <AdminButton variant="secondary" size="sm" href={page < totalPages ? link({ page: page + 1 }) : undefined} disabled={page >= totalPages}>
            Հաջորդ →
          </AdminButton>
        </div>
      )}
    </div>
  );
}
