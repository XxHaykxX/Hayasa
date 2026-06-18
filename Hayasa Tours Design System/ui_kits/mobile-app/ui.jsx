/* Hayasa Tours — LIGHT "Lagoon Bungalow" primitives. Self-contained. */

const ICON_PATHS = {
  home: ['M3 9.5 12 3l9 6.5V20a1.5 1.5 0 0 1-1.5 1.5h-4V14h-7v7.5h-4A1.5 1.5 0 0 1 3 20z'],
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.3-4.3'],
  ticket: ['M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z', 'M13 5v2', 'M13 11v2', 'M13 17v2'],
  user: ['M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
  clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 6v6l4 2'],
  pin: ['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z', 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'],
  users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  chevronLeft: ['M15 18l-6-6 6-6'],
  plus: ['M12 5v14', 'M5 12h14'],
  minus: ['M5 12h14'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M2 12h20', 'M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z'],
  phone: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z'],
  send: ['M22 2 11 13', 'M22 2 15 22l-4-9-9-4z'],
  star: ['M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.55 6.09 20.66l1.13-6.57L2.45 9.44l6.6-.96z'],
  arrowRight: ['M5 12h14', 'M12 5l7 7-7 7'],
  check: ['M20 6 9 17l-5-5'],
  route: ['M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M18 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M9 19h6a3 3 0 0 0 3-3v-1'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.5-4 1-5.5.5 2.5 2 3.5 3 4.5 1.5 1.5 2 3 2 5a5 5 0 1 1-10 0c0-.5.04-1 .5-1.5z'],
  edit: ['M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7', 'M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z'],
  bell: ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9z', 'M10.3 21a1.94 1.94 0 0 0 3.4 0'],
  heart: ['M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 12 5 5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7z'],
  shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
  chevronRightSm: ['M9 18l6-6-6-6'],
};

function Icon({ name, size = 22, color = 'currentColor', stroke = 2, fill = 'none', style }) {
  const paths = ICON_PATHS[name] || [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

/* ---------- Scenery: light lagoon-lake landscape placeholder ---------- */
const SCENERY_VARIANTS = [
  { sky: 'linear-gradient(180deg, #e6f5f2 0%, #f3faf8 55%)',
    ridges: ['polygon(0 60%,20% 44%,38% 56%,56% 40%,74% 52%,90% 42%,100% 50%,100% 70%,0 70%)',
             'polygon(0 70%,24% 58%,46% 68%,66% 56%,84% 66%,100% 60%,100% 100%,0 100%)'],
    near: '#b6dcd6' },
  { sky: 'linear-gradient(180deg, #e3f3f0 0%, #f1f9f7 55%)',
    ridges: ['polygon(0 52%,22% 62%,42% 48%,60% 58%,80% 46%,100% 56%,100% 70%,0 70%)',
             'polygon(0 72%,26% 60%,48% 70%,70% 58%,88% 68%,100% 62%,100% 100%,0 100%)'],
    near: '#abd4ce' },
  { sky: 'linear-gradient(180deg, #e9f4ee 0%, #f4faf6 55%)',
    ridges: ['polygon(0 58%,16% 46%,38% 58%,56% 42%,74% 54%,90% 44%,100% 52%,100% 70%,0 70%)',
             'polygon(0 74%,24% 62%,46% 72%,66% 60%,84% 70%,100% 64%,100% 100%,0 100%)'],
    near: '#bdded6' },
  { sky: 'linear-gradient(180deg, #e4f2f4 0%, #f2f9fa 55%)',
    ridges: ['polygon(0 56%,22% 48%,42% 60%,60% 46%,80% 56%,100% 46%,100% 70%,0 70%)',
             'polygon(0 72%,20% 64%,44% 72%,68% 62%,86% 70%,100% 64%,100% 100%,0 100%)'],
    near: '#aed6d3' },
];

function Scenery({ variant = 0, glow = true, children, style }) {
  const v = SCENERY_VARIANTS[variant % SCENERY_VARIANTS.length];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: v.sky, ...style }}>
      {/* warm sun */}
      {glow && <div style={{ position: 'absolute', left: '72%', top: '18%', width: 90, height: 90,
        transform: 'translate(-50%,-50%)', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,226,11,0.5) 0%, rgba(255,226,11,0) 68%)' }} />}
      {/* far ridge */}
      <div style={{ position: 'absolute', inset: 0, background: '#9bc4cf', clipPath: v.ridges[0], opacity: 0.55 }} />
      {/* near ridge */}
      <div style={{ position: 'absolute', inset: 0, background: v.near, clipPath: v.ridges[1] }} />
      {/* water */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%',
        background: 'linear-gradient(180deg, #7bc2c0 0%, #5bafb0 100%)' }} />
      {/* water shimmer lines */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%', opacity: 0.25,
        backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 9px)' }} />
      {children}
    </div>
  );
}

/* ---------- Countdown ---------- */
function useCountdown(target) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  let diff = Math.max(0, Math.floor((target - now) / 1000));
  const d = Math.floor(diff / 86400); diff -= d * 86400;
  const h = Math.floor(diff / 3600); diff -= h * 3600;
  const m = Math.floor(diff / 60); const s = diff - m * 60;
  const pad = (n) => String(n).padStart(2, '0');
  return { d: pad(d), h: pad(h), m: pad(m), s: pad(s) };
}

function Countdown({ target, size = 'lg' }) {
  const t = useCountdown(target);
  const big = size === 'lg';
  const units = [[t.d, 'DAYS'], [t.h, 'HRS'], [t.m, 'MIN'], [t.s, 'SEC']];
  return (
    <div style={{ display: 'flex', gap: big ? 10 : 6, alignItems: 'flex-start' }}>
      {units.map(([val, label], i) => (
        <React.Fragment key={label}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary)',
              fontSize: big ? 30 : 17, lineHeight: 1, letterSpacing: '-0.5px' }}>{val}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: big ? 9 : 8, fontWeight: 700,
              letterSpacing: '1.5px', color: 'var(--text-faint)' }}>{label}</span>
          </div>
          {i < 3 && <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'rgba(226,104,94,0.4)',
            fontSize: big ? 26 : 15, lineHeight: 1, marginTop: big ? 1 : 0 }}>:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ---------- StatusBadge: filled pills ---------- */
const STATUS = {
  pending:   { bg: '#FFE20B', fg: '#1A3A5C', label: 'Pending' },
  confirmed: { bg: '#2A9D6A', fg: '#FFFFFF', label: 'Confirmed' },
  paid:      { bg: '#1A3A5C', fg: '#FFFFFF', label: 'Paid' },
  cancelled: { bg: '#D43A3A', fg: '#FFFFFF', label: 'Cancelled' },
};
function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.pending;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 12px', borderRadius: 999,
      background: s.bg, color: s.fg, fontFamily: 'var(--font-body)', fontSize: 11.5, fontWeight: 700,
      letterSpacing: '0.2px' }}>{s.label}</span>
  );
}

/* ---------- Button ---------- */
function Btn({ children, variant = 'primary', icon, full, onClick, style }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 700, cursor: 'pointer',
    border: 'none', borderRadius: 12, padding: '14px 20px', width: full ? '100%' : 'auto',
    transition: 'transform .12s ease, background .15s ease', userSelect: 'none', ...style,
  };
  const variants = {
    primary: { background: 'var(--primary)', color: 'var(--on-primary)', boxShadow: '0 6px 16px rgba(226,104,94,0.32)' },
    teal: { background: 'var(--teal)', color: '#fff', boxShadow: '0 6px 16px rgba(26,122,138,0.22)' },
    secondary: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' },
  };
  return (
    <button className={'hb-btn hb-btn-' + variant} style={{ ...base, ...variants[variant] }} onClick={onClick}>
      {children}
      {icon && <Icon name={icon} size={18} color={variant === 'secondary' ? 'currentColor' : '#fff'} />}
    </button>
  );
}

/* ---------- StatusBar (dark glyphs on light) ---------- */
function StatusBar() {
  return (
    <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 26px 0 30px', flex: 'none' }}>
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill="var(--text)"><rect x="0" y="6" width="3" height="5" rx="1"/><rect x="4.5" y="4" width="3" height="7" rx="1"/><rect x="9" y="2" width="3" height="9" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="1" y="1" width="17" height="9" rx="2.5" stroke="var(--text)" opacity="0.4"/><rect x="2.5" y="2.5" width="12" height="6" rx="1.5" fill="var(--text)"/><rect x="19.5" y="3.5" width="1.5" height="4" rx="0.75" fill="var(--text)" opacity="0.4"/></svg>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Scenery, Countdown, useCountdown, StatusBadge, Btn, StatusBar, STATUS });
