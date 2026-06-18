/* Hayasa Tours — LIGHT app screens. Composes light primitives from ui.jsx. */

const NOW = Date.now();
const DAY = 86400000;
const T = {
  geghard: NOW + 3 * DAY + 7 * 3600000 + 42 * 60000,
  sevan:   NOW + 9 * DAY + 5 * 3600000,
  tatev:   NOW + 16 * DAY + 11 * 3600000,
  dilijan: NOW + 24 * DAY + 2 * 3600000,
};

/* ===================== HOME ===================== */
function HomeScreen() {
  return (
    <div className="hb-scroll" style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 20px 16px' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '2.5px',
            color: 'var(--teal)' }}>ՀԱՅԱՍԱ · HAYASA</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--text)',
            lineHeight: 1, marginTop: 2 }}>Բարև, Areg</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="hb-iconbtn"><Icon name="globe" size={19} color="var(--teal)" /></div>
          <div className="hb-iconbtn" style={{ position: 'relative' }}>
            <Icon name="bell" size={19} color="var(--teal)" />
            <span style={{ position: 'absolute', top: 9, right: 10, width: 7, height: 7, borderRadius: '50%',
              background: 'var(--primary)', border: '2px solid var(--surface)' }} />
          </div>
        </div>
      </div>

      {/* hero — white card, photo top, content below */}
      <div style={{ padding: '0 20px' }}>
        <div className="hb-card hb-shadow" style={{ overflow: 'hidden' }}>
          <div style={{ position: 'relative', height: 190 }}>
            <Scenery variant={0} />
            <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
              <span className="hb-chip"><Icon name="flame" size={12} color="#1A3A5C" />Next departure</span>
              <span className="hb-chip-ghost"><Icon name="star" size={11} color="var(--primary)" fill="var(--primary)" />4.9</span>
            </div>
          </div>
          <div style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)', marginBottom: 6 }}>
              <Icon name="pin" size={13} color="var(--teal)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500 }}>Geghard · Garni · Azat Gorge</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, color: 'var(--text)',
              margin: '0 0 16px', lineHeight: 1.05 }}>Monasteries of the Cliffs</h2>
            <div style={{ background: 'var(--surface-2)', borderRadius: 12, padding: '14px 16px', marginBottom: 14 }}>
              <Countdown target={T.geghard} size="lg" />
            </div>
            <Btn variant="primary" full icon="arrowRight">Reserve your seat</Btn>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '24px 20px 12px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--text)', margin: 0 }}>Upcoming tours</h3>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 700, color: 'var(--teal)' }}>See all</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 20px 8px' }}>
        <TourCard variant={1} name="Lake Sevan & Sevanavank" loc="Gegharkunik" date="Jun 26" target={T.sevan} />
        <TourCard variant={2} name="Tatev & the Wings" loc="Syunik · cable car" date="Jul 3" target={T.tatev} />
        <TourCard variant={3} name="Dilijan Forest Trails" loc="Tavush" date="Jul 11" target={T.dilijan} />
      </div>
    </div>
  );
}

function TourCard({ variant, name, loc, date, target }) {
  return (
    <div className="hb-card hb-shadow" style={{ display: 'flex', gap: 14, padding: 12, alignItems: 'center' }}>
      <div style={{ position: 'relative', width: 92, height: 92, borderRadius: 12, overflow: 'hidden', flex: 'none' }}>
        <Scenery variant={variant} glow={false} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-dim)', marginBottom: 3 }}>
          <Icon name="pin" size={11} color="var(--teal)" />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500 }}>{loc}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, color: 'var(--text)',
          lineHeight: 1.2, marginBottom: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Countdown target={target} size="sm" />
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-body)', fontSize: 10.5,
            fontWeight: 600, color: 'var(--text-dim)' }}>
            <Icon name="calendar" size={11} color="var(--text-dim)" />{date}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ===================== TOUR DETAIL ===================== */
const ROADMAP = [
  { t: '08:00', title: 'Depart Republic Square', sub: 'Yerevan · meeting point at the fountains' },
  { t: '09:15', title: 'Garni Temple', sub: 'Hellenistic temple above the gorge' },
  { t: '11:00', title: 'Symphony of Stones', sub: 'Basalt columns in the Azat canyon' },
  { t: '13:30', title: 'Geghard Monastery', sub: 'Rock-hewn UNESCO complex + lunch' },
  { t: '17:00', title: 'Return to Yerevan', sub: 'Arrive ~18:30 at Republic Square' },
];

function DetailScreen() {
  return (
    <div className="hb-scroll" style={{ flex: 1, overflowY: 'auto', background: 'var(--surface)' }}>
      <div style={{ position: 'relative', height: 260 }}>
        <Scenery variant={0} />
        <div style={{ position: 'absolute', top: 6, left: 20, right: 20, display: 'flex', justifyContent: 'space-between' }}>
          <div className="hb-iconbtn hb-glass"><Icon name="chevronLeft" size={20} color="var(--text)" /></div>
          <div className="hb-iconbtn hb-glass"><Icon name="heart" size={19} color="var(--text)" /></div>
        </div>
        <div style={{ position: 'absolute', bottom: 14, left: 0, right: 0, display: 'flex', gap: 6, justifyContent: 'center' }}>
          {[0,1,2,3].map(i => <span key={i} style={{ width: i===0?18:6, height: 6, borderRadius: 3,
            background: i===0 ? '#fff' : 'rgba(255,255,255,0.55)' }} />)}
        </div>
      </div>

      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span className="hb-chip-sm">Cultural</span>
          <span className="hb-chip-sm">Group tour</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-body)', fontSize: 12,
            fontWeight: 600, color: 'var(--text-dim)', marginLeft: 'auto' }}>
            <Icon name="star" size={13} color="var(--primary)" fill="var(--primary)" />4.9 (212)</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, color: 'var(--text)',
          margin: '0 0 14px', lineHeight: 1.05 }}>Monasteries of the Cliffs</h1>

        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          {[['clock','1 day'],['users','Max 18'],['pin','62 km']].map(([ic, tx]) => (
            <div key={tx} className="hb-stat">
              <Icon name={ic} size={16} color="var(--teal)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600, color: 'var(--text)' }}>{tx}</span>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-dim)', margin: '0 0 22px' }}>
          A full day through the Azat valley — from the columned temple of Garni to the rock-cut chambers of Geghard,
          where chant still echoes off stone carved a thousand years ago. Guided in Armenian, Russian and English.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Icon name="route" size={18} color="var(--teal)" />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 600, color: 'var(--text)', margin: 0 }}>Roadmap</h3>
        </div>
        <div style={{ position: 'relative', paddingLeft: 4 }}>
          {ROADMAP.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 34, flex: 'none' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', flex: 'none',
                  background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13,
                  boxShadow: '0 4px 10px rgba(226,104,94,0.30)', zIndex: 1 }}>{i+1}</div>
                {i < ROADMAP.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--teal)', opacity: 0.4 }} />}
              </div>
              <div style={{ paddingBottom: i < ROADMAP.length - 1 ? 22 : 4 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--teal)' }}>{s.t}</span>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--text)', margin: '1px 0 2px' }}>{s.title}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--text-dim)', lineHeight: 1.4 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 600, color: 'var(--text)', margin: '8px 0 12px' }}>Route map</h3>
        <YandexMap />
        <div style={{ height: 24 }} />
      </div>

      <div style={{ position: 'sticky', bottom: 0, background: 'var(--surface)', padding: '14px 20px 18px',
        display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid var(--border)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-dim)' }}>per person</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>18 500 <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>֏</span></div>
        </div>
        <Btn variant="primary" icon="arrowRight" style={{ flex: 1 }}>Book Now</Btn>
      </div>
    </div>
  );
}

function YandexMap() {
  return (
    <div style={{ position: 'relative', height: 180, borderRadius: 'var(--radius)', overflow: 'hidden',
      border: '1px solid var(--border)', background: '#e9f4f1' }}>
      <svg width="100%" height="100%" viewBox="0 0 340 180" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        <rect width="340" height="180" fill="#e6f3ef" />
        {[30,70,110,150].map(y => <line key={'h'+y} x1="0" y1={y} x2="340" y2={y} stroke="#d2e8e2" strokeWidth="1" />)}
        {[60,130,200,270].map(x => <line key={'v'+x} x1={x} y1="0" x2={x} y2="180" stroke="#d2e8e2" strokeWidth="1" />)}
        <path d="M-10 40 Q 90 70 140 50 T 360 90" stroke="#a9dcd6" strokeWidth="8" fill="none" />
        <path d="M40 150 L 110 120 L 175 95 L 250 60 L 300 35" stroke="var(--primary)" strokeWidth="3"
          fill="none" strokeDasharray="2 7" strokeLinecap="round" />
      </svg>
      {[[40,150,'1'],[175,95,'3'],[300,35,'5']].map(([x,y,n]) => (
        <div key={n} style={{ position: 'absolute', left: (x/340*100)+'%', top: (y/180*100)+'%',
          transform: 'translate(-50%,-100%)' }}>
          <div style={{ width: 22, height: 22, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)',
            background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(226,104,94,0.38)' }}>
            <span style={{ transform: 'rotate(45deg)', fontFamily: 'var(--font-mono)', fontWeight: 700,
              fontSize: 11, color: '#fff' }}>{n}</span>
          </div>
        </div>
      ))}
      <div style={{ position: 'absolute', bottom: 8, right: 8, padding: '4px 8px', borderRadius: 8,
        background: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700,
        color: 'var(--text-dim)', letterSpacing: '0.5px' }}>YANDEX MAPS</div>
    </div>
  );
}

/* ===================== BOOKING ===================== */
function BookingScreen() {
  const [seats, setSeats] = React.useState(2);
  const price = 18500;
  return (
    <div className="hb-scroll" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 20px 18px' }}>
        <div className="hb-iconbtn"><Icon name="chevronLeft" size={20} color="var(--text)" /></div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--text)', margin: 0 }}>Reserve your seat</h1>
      </div>

      <div style={{ margin: '0 20px 22px' }} className="hb-card hb-shadow">
        <div style={{ display: 'flex', gap: 12, padding: 12, alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 56, height: 56, borderRadius: 10, overflow: 'hidden', flex: 'none' }}>
            <Scenery variant={0} glow={false} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Monasteries of the Cliffs</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-dim)', marginTop: 3,
              display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="calendar" size={12} color="var(--teal)" />Sat, Jun 20 · 08:00</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Field label="Full name"><input className="hb-input" defaultValue="Areg Petrosyan" /></Field>
        <Field label="Phone number">
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-dim)', padding: '0 12px 0 14px',
              borderRight: '1px solid var(--border)' }}>+374</span>
            <input className="hb-input" style={{ border: 'none', background: 'transparent', paddingLeft: 12 }} defaultValue="91 23 45 67" />
          </div>
        </Field>

        <Field label="Number of seats">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, padding: '8px 12px' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-dim)' }}>Travellers</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <button className="hb-counter" onClick={() => setSeats(s => Math.max(1, s-1))}><Icon name="minus" size={18} color="#fff" /></button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: 'var(--text)', minWidth: 22, textAlign: 'center' }}>{seats}</span>
              <button className="hb-counter" onClick={() => setSeats(s => Math.min(18, s+1))}><Icon name="plus" size={18} color="#fff" /></button>
            </div>
          </div>
        </Field>

        <Field label="Language of guide">
          <div style={{ display: 'flex', gap: 8 }}>
            {['Հայերեն','Русский','English'].map((l, i) => (
              <div key={l} className={'hb-seg' + (i===2 ? ' hb-seg-on' : '')} style={{ flex: 1 }}>{l}</div>
            ))}
          </div>
        </Field>
      </div>

      <div style={{ flex: 1, minHeight: 16 }} />
      <div style={{ position: 'sticky', bottom: 0, background: 'var(--surface)', borderTop: '1px solid var(--border)',
        padding: '14px 20px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-dim)' }}>{seats} × 18 500 ֏</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{(price*seats).toLocaleString('ru-RU')} <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>֏</span></span>
        </div>
        <Btn variant="primary" full icon="check">Confirm booking</Btn>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
        color: 'var(--text)', marginBottom: 8, letterSpacing: '0.2px', background: 'var(--surface-2)', padding: '4px 10px',
        borderRadius: 7 }}>{label}</span>
      {children}
    </label>
  );
}

/* ===================== MY TOURS ===================== */
const MY_TOURS = [
  { name: 'Monasteries of the Cliffs', date: 'Jun 20, 2026', seats: 2, status: 'confirmed', variant: 0 },
  { name: 'Lake Sevan & Sevanavank', date: 'Jun 26, 2026', seats: 1, status: 'pending', variant: 1 },
  { name: 'Tbilisi Old Town', date: 'Jul 9, 2026', seats: 3, status: 'paid', variant: 2 },
  { name: 'Dilijan Forest Trails', date: 'May 2, 2026', seats: 2, status: 'cancelled', variant: 3 },
];
function MyToursScreen() {
  const [tab, setTab] = React.useState('upcoming');
  return (
    <div className="hb-scroll" style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '6px 20px 0' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, color: 'var(--text)', margin: '0 0 16px' }}>My Tours</h1>
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          {[['upcoming','Upcoming'],['past','Past']].map(([k, l]) => (
            <div key={k} onClick={() => setTab(k)} className={'hb-seg' + (tab===k ? ' hb-seg-on' : '')} style={{ flex: 'none', padding: '8px 18px' }}>{l}</div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 20px 12px' }}>
        {MY_TOURS.map((t, i) => (
          <div key={i} className="hb-card hb-shadow" style={{ padding: 14 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ position: 'relative', width: 64, height: 64, borderRadius: 11, overflow: 'hidden', flex: 'none' }}>
                <Scenery variant={t.variant} glow={false} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--text)',
                  lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6, color: 'var(--text-dim)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-body)', fontSize: 12 }}>
                    <Icon name="calendar" size={12} color="var(--text-dim)" />{t.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-body)', fontSize: 12 }}>
                    <Icon name="users" size={12} color="var(--text-dim)" />{t.seats}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12,
              paddingTop: 12, borderTop: '1px solid var(--border)' }}>
              <StatusBadge status={t.status} />
              <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'var(--font-body)', fontSize: 12.5,
                fontWeight: 700, color: 'var(--teal)' }}>Details <Icon name="chevronRightSm" size={14} color="var(--teal)" /></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== PROFILE ===================== */
function ProfileScreen() {
  const [lang, setLang] = React.useState('en');
  return (
    <div className="hb-scroll" style={{ flex: 1, overflowY: 'auto' }}>
      {/* pale aqua top section */}
      <div style={{ background: 'var(--surface-2)', padding: '14px 20px 24px', display: 'flex', flexDirection: 'column',
        alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--surface)',
            border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(26,58,92,0.12)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600, color: 'var(--teal)' }}>AP</span>
          </div>
          <div className="hb-iconbtn" style={{ position: 'absolute', bottom: -2, right: -2, width: 28, height: 28 }}><Icon name="edit" size={13} color="var(--teal)" /></div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--text)', margin: '12px 0 2px', whiteSpace: 'nowrap' }}>Areg Petrosyan</h1>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-dim)' }}>areg.p@gmail.com</span>
      </div>

      <div style={{ display: 'flex', gap: 10, padding: '20px 20px 0' }}>
        {[['12','Tours'],['3','Countries'],['4.9','Rating']].map(([n, l]) => (
          <div key={l} style={{ flex: 1 }} className="hb-card hb-shadow">
            <div style={{ padding: '14px 8px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--teal)' }}>{n}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--text-dim)', marginTop: 2 }}>{l}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--text-dim)',
          letterSpacing: '1px', marginBottom: 10 }}>LANGUAGE</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[['hy','🇦🇲','Հայերեն'],['ru','🇷🇺','Русский'],['en','🇬🇧','English']].map(([k, flag, l]) => (
            <div key={k} onClick={() => setLang(k)} className={'hb-seg' + (lang===k ? ' hb-seg-on' : '')}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <span style={{ fontSize: 14 }}>{flag}</span>{l}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--text-dim)',
          letterSpacing: '1px', marginBottom: 10 }}>NEED HELP?</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="teal" icon="phone" style={{ flex: 1, fontSize: 14 }}>WhatsApp</Btn>
          <Btn variant="teal" icon="send" style={{ flex: 1, fontSize: 14 }}>Telegram</Btn>
        </div>
      </div>

      <div style={{ padding: '24px 20px 12px' }}>
        {[['ticket','My bookings'],['heart','Saved tours'],['shield','Privacy & security']].map(([ic, l], i, a) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 4px',
            borderBottom: i < a.length-1 ? '1px solid var(--border)' : 'none' }}>
            <Icon name={ic} size={19} color="var(--teal)" />
            <span style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: 14.5, fontWeight: 500, color: 'var(--text)' }}>{l}</span>
            <Icon name="chevronRightSm" size={17} color="var(--text-dim)" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== BOTTOM NAV ===================== */
function BottomNav({ active }) {
  const items = [['home','Home'],['search','Search'],['ticket','My Tours'],['user','Profile']];
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px 8px 22px',
      borderTop: '1px solid var(--border)', background: 'var(--surface)', flex: 'none' }}>
      {items.map(([ic, l]) => {
        const on = l === active;
        return (
          <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flex: 1 }}>
            <Icon name={ic} size={23} color={on ? 'var(--tab-active)' : 'var(--tab-inactive)'}
              fill={on ? 'rgba(26,58,92,0.10)' : 'none'} stroke={on ? 2.2 : 2} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: on ? 700 : 500,
              color: on ? 'var(--tab-active)' : 'var(--tab-inactive)' }}>{l}</span>
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, { HomeScreen, DetailScreen, BookingScreen, MyToursScreen, ProfileScreen, BottomNav });
