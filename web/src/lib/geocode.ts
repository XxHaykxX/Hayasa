// Server-only best-effort geocoder using Photon (komoot) — free, keyless.
// Used to auto-fill coordinates for imported stops so the route map works
// without hand-placing every pin. Returns null when no confident match.
import 'server-only';

const PHOTON = 'https://photon.komoot.io';
// Armenia + Georgia bounding box: minLon,minLat,maxLon,maxLat.
const BBOX = { minLon: 43.4, minLat: 38.8, maxLon: 46.7, maxLat: 41.4 };
const BBOX_STR = `${BBOX.minLon},${BBOX.minLat},${BBOX.maxLon},${BBOX.maxLat}`;

export type GeoPoint = { lat: number; lng: number };

// Photon does not index Armenian-script names, but resolves Latin ones well
// (Գառնի→"Garni"). Transliterate so imported /hy stops geocode.
const HY_MAP: Record<string, string> = {
  ու: 'u', ու̃: 'u',
  ա: 'a', բ: 'b', գ: 'g', դ: 'd', ե: 'e', զ: 'z', է: 'e', ը: 'e', թ: 't',
  ժ: 'zh', ի: 'i', լ: 'l', խ: 'kh', ծ: 'ts', կ: 'k', հ: 'h', ձ: 'dz', ղ: 'gh',
  ճ: 'ch', մ: 'm', յ: 'y', ն: 'n', շ: 'sh', ո: 'o', չ: 'ch', պ: 'p', ջ: 'j',
  ռ: 'r', ս: 's', վ: 'v', տ: 't', ր: 'r', ց: 'ts', փ: 'p', ք: 'q', և: 'ev',
  օ: 'o', ֆ: 'f',
};

function translitHy(s: string): string {
  const lower = s.toLowerCase();
  let out = '';
  for (let i = 0; i < lower.length; i++) {
    const two = lower.slice(i, i + 2);
    if (HY_MAP[two]) { out += HY_MAP[two]; i++; continue; }
    out += HY_MAP[lower[i]] ?? lower[i];
  }
  return out;
}

const hasArmenian = (s: string) => /[Ա-֏]/.test(s);

const inBbox = (lat: number, lng: number) =>
  lat >= BBOX.minLat && lat <= BBOX.maxLat && lng >= BBOX.minLon && lng <= BBOX.maxLon;

/**
 * Geocode a single place name, biased to Armenia + Georgia. Best-effort:
 * returns the first result that falls inside the bbox, else null. Tries the
 * name as given first (handles Armenian script), then a ", Armenia" hint.
 */
export async function geocodePlace(name: string): Promise<GeoPoint | null> {
  const q = name.trim();
  if (q.length < 2) return null;

  // Strip a leading "Day N:" / numbering competitors prepend, take first clause.
  const core = q.replace(/^[\s\d.:)＞>–—-]+/, '').split(/[,.;–—|]/)[0].trim() || q;
  const terms = new Set<string>();
  if (hasArmenian(core)) {
    const tr = translitHy(core);
    terms.add(tr);
    terms.add(`${tr}, Armenia`);
  }
  terms.add(core);
  terms.add(`${core}, Armenia`);

  for (const term of terms) {
    try {
      const url = `${PHOTON}/api/?q=${encodeURIComponent(term)}&limit=1&lang=en&bbox=${BBOX_STR}`;
      const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (!r.ok) continue;
      const d = await r.json();
      const c = d?.features?.[0]?.geometry?.coordinates; // [lng, lat]
      if (Array.isArray(c) && c.length === 2) {
        const [lng, lat] = c as [number, number];
        if (typeof lat === 'number' && typeof lng === 'number' && inBbox(lat, lng)) {
          return { lat, lng };
        }
      }
    } catch {
      /* network/timeout — fall through to next term */
    }
  }
  return null;
}

/**
 * Geocode many names with limited concurrency (politeness to the free API).
 * Preserves input order; unresolved names map to null.
 */
export async function geocodePlaces(names: string[], concurrency = 3): Promise<(GeoPoint | null)[]> {
  const out: (GeoPoint | null)[] = new Array(names.length).fill(null);
  let cursor = 0;
  const worker = async () => {
    while (cursor < names.length) {
      const i = cursor++;
      out[i] = await geocodePlace(names[i]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, names.length) }, worker));
  return out;
}
