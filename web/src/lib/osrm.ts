// Road geometry via the free OSRM router (OpenStreetMap). Server-only.
// Returns a polyline of [lat,lng] points following real roads, or null.
import 'server-only';

export async function fetchRoutePath(points: [number, number][]): Promise<[number, number][] | null> {
  if (points.length < 2) return null;
  const coordStr = points.map(([lat, lng]) => `${lng},${lat}`).join(';');
  try {
    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${coordStr}?overview=full&geometries=geojson`,
      { cache: 'no-store' },
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.code !== 'Ok' || !data.routes?.[0]) return null;
    return (data.routes[0].geometry.coordinates as [number, number][]).map(([lng, lat]) => [lat, lng]);
  } catch {
    return null;
  }
}
