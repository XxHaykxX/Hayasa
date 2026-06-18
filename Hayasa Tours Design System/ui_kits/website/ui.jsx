/* Hayasa Tours — website primitives. Exported to window. Tailwind classes + inline scenery. */

const ICON_PATHS = {
  menu: ['M3 12h18', 'M3 6h18', 'M3 18h18'],
  x: ['M18 6 6 18', 'M6 6l12 12'],
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.3-4.3'],
  pin: ['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z', 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
  clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 6v6l4 2'],
  users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M2 12h20', 'M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'],
  star: ['M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.55 6.09 20.66l1.13-6.57L2.45 9.44l6.6-.96z'],
  arrowRight: ['M5 12h14', 'M12 5l7 7-7 7'],
  chevronRight: ['M9 18l6-6-6-6'],
  chevronDown: ['M6 9l6 6 6-6'],
  chevronLeft: ['M15 18l-6-6 6-6'],
  check: ['M20 6 9 17l-5-5'],
  plus: ['M12 5v14', 'M5 12h14'],
  minus: ['M5 12h14'],
  phone: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z'],
  send: ['M22 2 11 13', 'M22 2 15 22l-4-9-9-4z'],
  route: ['M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M18 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M9 19h6a3 3 0 0 0 3-3v-1'],
  shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
  heart: ['M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 12 5 5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7z'],
  award: ['M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z', 'M8.2 13.9 7 22l5-3 5 3-1.2-8.1'],
  languages: ['M5 8h14', 'M5 8l3 8 3-8', 'M12 16h7', 'M3 4h8', 'M7 4v4'],
};

function Icon({ name, size = 22, color = 'currentColor', stroke = 2, fill = 'none', className }) {
  const paths = ICON_PATHS[name] || [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

const FLAGS = '🇦🇲 🇷🇺 🇬🇧';

/* ---------- Scenery: light lagoon-lake landscape placeholder ---------- */
const SCENERY_VARIANTS = [
  { sky: 'linear-gradient(180deg, #e6f5f2 0%, #f3faf8 55%)',
    r: ['polygon(0 58%,18% 42%,36% 56%,54% 38%,72% 52%,90% 40%,100% 50%,100% 70%,0 70%)',
        'polygon(0 70%,24% 58%,46% 68%,66% 56%,84% 66%,100% 60%,100% 100%,0 100%)'], near: '#b6dcd6' },
  { sky: 'linear-gradient(180deg, #e3f3f0 0%, #f1f9f7 55%)',
    r: ['polygon(0 50%,22% 62%,42% 46%,60% 58%,80% 44%,100% 56%,100% 70%,0 70%)',
        'polygon(0 72%,26% 60%,48% 70%,70% 58%,88% 68%,100% 62%,100% 100%,0 100%)'], near: '#abd4ce' },
  { sky: 'linear-gradient(180deg, #e9f4ee 0%, #f4faf6 55%)',
    r: ['polygon(0 56%,16% 44%,38% 58%,56% 40%,74% 54%,90% 42%,100% 52%,100% 70%,0 70%)',
        'polygon(0 74%,24% 62%,46% 72%,66% 60%,84% 70%,100% 64%,100% 100%,0 100%)'], near: '#bdded6' },
  { sky: 'linear-gradient(180deg, #e4f2f4 0%, #f2f9fa 55%)',
    r: ['polygon(0 54%,22% 46%,42% 60%,60% 44%,80% 56%,100% 44%,100% 70%,0 70%)',
        'polygon(0 72%,20% 64%,44% 72%,68% 62%,86% 70%,100% 64%,100% 100%,0 100%)'], near: '#aed6d3' },
  { sky: 'linear-gradient(180deg, #eaf3ec 0%, #f5faf6 55%)',
    r: ['polygon(0 60%,20% 48%,40% 60%,58% 46%,78% 58%,100% 48%,100% 70%,0 70%)',
        'polygon(0 74%,22% 66%,46% 74%,68% 64%,86% 72%,100% 66%,100% 100%,0 100%)'], near: '#b9d9d1' },
  { sky: 'linear-gradient(180deg, #e5f4f1 0%, #f2faf8 55%)',
    r: ['polygon(0 52%,18% 60%,40% 48%,58% 58%,78% 46%,100% 54%,100% 70%,0 70%)',
        'polygon(0 72%,26% 62%,48% 70%,70% 60%,88% 68%,100% 62%,100% 100%,0 100%)'], near: '#a9d2cd' },
];

function Scenery({ variant = 0, sun = true, className, style }) {
  const v = SCENERY_VARIANTS[variant % SCENERY_VARIANTS.length];
  return (
    <div className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: v.sky, ...style }}>
      {sun && <div style={{ position: 'absolute', left: '74%', top: '20%', width: '22%', paddingBottom: '22%',
        transform: 'translate(-50%,-50%)', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,226,11,0.55) 0%, rgba(255,226,11,0) 68%)' }} />}
      <div style={{ position: 'absolute', inset: 0, background: '#9bc4cf', clipPath: v.r[0], opacity: 0.55 }} />
      <div style={{ position: 'absolute', inset: 0, background: v.near, clipPath: v.r[1] }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%',
        background: 'linear-gradient(180deg, #7bc2c0 0%, #5bafb0 100%)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%', opacity: 0.22,
        backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 9px)' }} />
    </div>
  );
}

/* ---------- Countdown ---------- */
function useCountdown(target) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  let diff = Math.max(0, Math.floor((target - now) / 1000));
  const d = Math.floor(diff / 86400); diff -= d * 86400;
  const h = Math.floor(diff / 3600); diff -= h * 3600;
  const m = Math.floor(diff / 60); const s = diff - m * 60;
  const pad = (n) => String(n).padStart(2, '0');
  return { d: pad(d), h: pad(h), m: pad(m), s: pad(s) };
}

/* size: 'xl' (hero/sidebar, yellow on navy) | 'sm' (card, amber inline) */
function Countdown({ target, size = 'xl' }) {
  const t = useCountdown(target);
  const units = [[t.d, 'DAYS'], [t.h, 'HRS'], [t.m, 'MIN'], [t.s, 'SEC']];
  if (size === 'sm') {
    return (
      <div className="flex items-center gap-1.5">
        {units.map(([val, label], i) => (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              <span className="font-mono font-bold text-amber text-[15px] leading-none">{val}</span>
              <span className="font-body text-[7px] font-bold tracking-wider text-muted mt-0.5">{label}</span>
            </div>
            {i < 3 && <span className="font-mono font-bold text-amber/40 text-[13px] leading-none">:</span>}
          </React.Fragment>
        ))}
      </div>
    );
  }
  return (
    <div className="inline-flex items-stretch gap-2 rounded-xl bg-navy px-4 py-3">
      {units.map(([val, label], i) => (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center min-w-[44px]">
            <span className="font-mono font-bold text-yellow text-[34px] leading-none" style={{ textShadow: '0 0 16px rgba(255,226,11,0.4)' }}>{val}</span>
            <span className="font-body text-[9px] font-bold tracking-[0.15em] text-white/55 mt-1.5">{label}</span>
          </div>
          {i < 3 && <span className="font-mono font-bold text-yellow/40 text-[28px] leading-none self-start mt-0.5">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ---------- StatusBadge (soft tints) ---------- */
const STATUS = {
  pending:   { bg: '#FFF8E0', fg: '#B8860B', label: 'Pending' },
  confirmed: { bg: '#E0F7EE', fg: '#1A6B4A', label: 'Confirmed' },
  paid:      { bg: '#E0EBF7', fg: '#1A3A5C', label: 'Paid' },
  cancelled: { bg: '#FFE8E8', fg: '#CC3333', label: 'Cancelled' },
};
function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.pending;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold font-body"
      style={{ background: s.bg, color: s.fg }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.fg }} />{s.label}
    </span>
  );
}

/* ---------- Buttons ---------- */
function Btn({ children, variant = 'amber', icon, full, onClick, size = 'md', className = '' }) {
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-[15px]', lg: 'px-7 py-3.5 text-base' };
  const variants = {
    amber: 'bg-amber text-white hover:bg-amber-dark shadow-[0_6px_16px_rgba(226,104,94,0.30)]',
    teal: 'bg-teal text-white hover:bg-[#156876]',
    outline: 'bg-white text-navy border border-edge hover:border-teal hover:text-teal',
    ghost: 'bg-transparent text-navy hover:text-teal',
  };
  return (
    <button onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-body font-bold transition-all active:scale-[0.97] ${sizes[size]} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`}>
      {children}{icon && <Icon name={icon} size={18} color="currentColor" />}
    </button>
  );
}

function LangSwitcher({ compact }) {
  return (
    <div className="flex items-center gap-1 text-[15px]" title="Հայերեն / Русский / English">
      <button className="px-1 hover:scale-110 transition-transform">🇦🇲</button>
      <button className="px-1 opacity-50 hover:opacity-100 transition-opacity">🇷🇺</button>
      <button className="px-1 opacity-50 hover:opacity-100 transition-opacity">🇬🇧</button>
    </div>
  );
}

/* ---------- Navbar ---------- */
function Navbar({ navigate, page }) {
  const [open, setOpen] = React.useState(false);
  const links = [['tours', 'Tours'], ['about', 'About'], ['contact', 'Contact']];
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-edge">
      <div className="mx-auto max-w-[1200px] px-6 h-[68px] flex items-center justify-between">
        <button onClick={() => navigate('home')} className="font-display text-2xl font-bold text-navy tracking-tight whitespace-nowrap">
          HAYASA <span className="text-teal">TOURS</span></button>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(([k, l]) => (
            <button key={k} onClick={() => navigate(k === 'tours' ? 'tours' : k)}
              className={`font-body text-[15px] font-medium transition-colors ${page === k ? 'text-teal' : 'text-navy hover:text-teal'}`}>{l}</button>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <LangSwitcher />
          <Btn variant="amber" size="sm" onClick={() => navigate('tours')}>Book Now</Btn>
        </div>
        <button className="md:hidden text-navy" onClick={() => setOpen(o => !o)}>
          <Icon name={open ? 'x' : 'menu'} size={24} /></button>
      </div>
      {open && (
        <div className="md:hidden border-t border-edge bg-white px-6 py-4 flex flex-col gap-3">
          {links.map(([k, l]) => <button key={k} onClick={() => { setOpen(false); navigate(k === 'tours' ? 'tours' : k); }} className="text-left font-body text-navy font-medium py-1">{l}</button>)}
          <div className="flex items-center justify-between pt-2"><LangSwitcher /><Btn variant="amber" size="sm" onClick={() => { setOpen(false); navigate('tours'); }}>Book Now</Btn></div>
        </div>
      )}
    </header>
  );
}

/* ---------- Footer ---------- */
function Footer({ navigate }) {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12 grid gap-8 md:grid-cols-[1.5fr_1fr_1fr] sm:grid-cols-2 grid-cols-1">
        <div>
          <div className="font-display text-2xl font-bold mb-3">HAYASA TOURS</div>
          <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">Group & cultural tours across Armenia and Georgia — in Armenian, Russian and English.</p>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="font-body text-xs font-bold tracking-widest text-white/40 mb-1">EXPLORE</div>
          {[['tours', 'All Tours'], ['about', 'About Us'], ['contact', 'Contact']].map(([k, l]) =>
            <button key={l} onClick={() => navigate(k === 'tours' ? 'tours' : k)} className="text-left font-body text-sm text-white/75 hover:text-yellow transition-colors">{l}</button>)}
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-body text-xs font-bold tracking-widest text-white/40 mb-1">GET IN TOUCH</div>
          <button className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-body text-sm font-bold text-white" style={{ background: '#25D366' }}><Icon name="phone" size={16} color="#fff" />WhatsApp</button>
          <button className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-body text-sm font-bold text-white" style={{ background: '#0088CC' }}><Icon name="send" size={15} color="#fff" />Telegram</button>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-6 py-5 font-body text-xs text-white/40">© 2026 Hayasa Tours. Yerevan, Armenia. All rights reserved.</div>
      </div>
    </footer>
  );
}

/* ---------- Tour data + card ---------- */
const NOW = Date.now(), DAY = 86400000;
const TOURS = [
  { id: 'geghard', name: 'Monasteries of the Cliffs', loc: 'Geghard · Garni', date: 'Jun 20, 2026', target: NOW + 3 * DAY + 7 * 3600000, seats: 4, price: '18 500', lang: 'AM · RU · EN', variant: 0, tag: 'Cultural' },
  { id: 'sevan', name: 'Lake Sevan & Sevanavank', loc: 'Gegharkunik', date: 'Jun 26, 2026', target: NOW + 9 * DAY + 5 * 3600000, seats: 6, price: '14 000', lang: 'RU · EN', variant: 1, tag: 'Classic' },
  { id: 'tatev', name: 'Tatev & the Wings', loc: 'Syunik · cable car', date: 'Jul 3, 2026', target: NOW + 16 * DAY, seats: 11, price: '24 000', lang: 'AM · EN', variant: 2, tag: 'Premium' },
  { id: 'dilijan', name: 'Dilijan Forest Trails', loc: 'Tavush', date: 'Jul 11, 2026', target: NOW + 24 * DAY, seats: 3, price: '16 500', lang: 'AM · RU', variant: 3, tag: 'Nature' },
  { id: 'tbilisi', name: 'Tbilisi Old Town', loc: 'Georgia · 2 days', date: 'Jul 18, 2026', target: NOW + 31 * DAY, seats: 8, price: '42 000', lang: 'RU · EN', variant: 4, tag: 'Cross-border' },
  { id: 'khor', name: 'Khor Virap & Ararat View', loc: 'Ararat plain', date: 'Jul 25, 2026', target: NOW + 38 * DAY, seats: 9, price: '12 000', lang: 'AM · RU · EN', variant: 5, tag: 'Classic' },
];

function TourCard({ tour, navigate }) {
  return (
    <div onClick={() => navigate('detail', tour.id)}
      className="group cursor-pointer bg-white rounded-[14px] border border-edge overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(26,58,92,0.13)] hover:border-l-4 hover:border-l-amber">
      <div className="relative h-[180px]">
        <Scenery variant={tour.variant} />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 font-body text-[11px] font-bold text-navy">{tour.tag}</span>
        <span className="absolute top-3 right-3 rounded-full px-3 py-1 font-body text-[11px] font-bold text-navy" style={{ background: '#FFE20B' }}>{tour.seats} seats left</span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-muted mb-1.5">
          <Icon name="pin" size={12} color="#1A7A8A" /><span className="font-body text-xs font-medium">{tour.loc}</span>
        </div>
        <h3 className="font-display text-[22px] font-bold text-navy leading-tight mb-3 group-hover:text-teal transition-colors">{tour.name}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 font-body text-xs font-medium text-muted"><Icon name="calendar" size={13} color="#6A8A88" />{tour.date}</span>
          <Countdown target={tour.target} size="sm" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-edge">
          <div><span className="font-mono text-lg font-bold text-navy">{tour.price}</span><span className="font-body text-sm text-muted"> ֏</span></div>
          <Btn variant="amber" size="sm" icon="arrowRight">View Tour</Btn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Scenery, Countdown, useCountdown, StatusBadge, Btn, LangSwitcher, Navbar, Footer, TourCard, TOURS, STATUS, FLAGS });
