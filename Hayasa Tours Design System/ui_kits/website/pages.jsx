/* Hayasa Tours — website pages. Composes primitives from ui.jsx. */

function Shell({ navigate, page, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar navigate={navigate} page={page} />
      <main className="flex-1">{children}</main>
      <Footer navigate={navigate} />
    </div>
  );
}

/* ===================== HOME ===================== */
function HomePage({ navigate }) {
  return (
    <Shell navigate={navigate} page="home">
      {/* hero */}
      <section className="relative h-[600px] overflow-hidden">
        <Scenery variant={0} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(26,58,92,0.55) 0%, rgba(26,58,92,0.15) 55%, transparent 100%)' }} />
        <div className="relative mx-auto max-w-[1200px] px-6 h-full flex flex-col justify-center">
          <div className="max-w-[620px]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 font-body text-xs font-bold text-white tracking-wide mb-5">{FLAGS} &nbsp;Group & cultural tours</span>
            <h1 className="font-display text-white font-bold leading-[1.02] text-[58px] mb-4">Discover Armenia<br />Together</h1>
            <p className="font-body text-white/90 text-lg leading-relaxed mb-7 max-w-[460px]">Small-group journeys through ancient monasteries, mountain lakes and highland villages — guided in Armenian, Russian and English.</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Btn variant="amber" size="lg" icon="arrowRight" onClick={() => navigate('tours')}>View Tours</Btn>
              <div>
                <div className="font-body text-[11px] font-bold tracking-widest text-white/70 mb-2">NEXT DEPARTURE IN</div>
                <Countdown target={TOURS[0].target} size="xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* upcoming tours */}
      <section className="bg-aqua">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="flex items-end justify-between mb-9">
            <div>
              <div className="font-body text-xs font-bold tracking-widest text-teal mb-2">DEPARTING SOON</div>
              <h2 className="font-display text-[38px] font-bold text-navy leading-none">Upcoming Tours</h2>
            </div>
            <Btn variant="outline" size="sm" icon="arrowRight" onClick={() => navigate('tours')}>All tours</Btn>
          </div>
          <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {TOURS.slice(0, 3).map(t => <TourCard key={t.id} tour={t} navigate={navigate} />)}
          </div>
        </div>
      </section>

      {/* why hayasa */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="text-center mb-12">
            <div className="font-body text-xs font-bold tracking-widest text-teal mb-2">WHY TRAVEL WITH US</div>
            <h2 className="font-display text-[38px] font-bold text-navy leading-none">The Hayasa Difference</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3 grid-cols-1">
            {[['users', 'Small Groups', 'Never more than 18 travellers — real conversations with your guide and the places you visit.'],
              ['languages', '3 Languages', 'Every tour runs in Armenian, Russian and English so everyone feels at home.'],
              ['award', 'Expert Guides', 'Local historians and naturalists who know the stories behind every stone.']].map(([ic, t, d]) => (
              <div key={t} className="text-center px-4">
                <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-aqua flex items-center justify-center"><Icon name={ic} size={26} color="#1A7A8A" /></div>
                <h3 className="font-display text-2xl font-bold text-navy mb-2">{t}</h3>
                <p className="font-body text-[15px] text-muted leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}

/* ===================== TOURS ===================== */
function ToursPage({ navigate }) {
  const [dateF, setDateF] = React.useState('All');
  const [lang, setLang] = React.useState('all');
  return (
    <Shell navigate={navigate} page="tours">
      <div className="bg-aqua border-b border-edge">
        <div className="mx-auto max-w-[1200px] px-6 py-10">
          <h1 className="font-display text-[42px] font-bold text-navy leading-none mb-2">Explore Our Tours</h1>
          <p className="font-body text-muted">{TOURS.length} departures across Armenia & Georgia</p>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        {/* search + filters */}
        <div className="flex flex-col gap-4 mb-9">
          <div className="relative max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2"><Icon name="search" size={18} color="#6A8A88" /></span>
            <input placeholder="Search tours, places…" className="w-full rounded-xl border border-edge bg-white pl-11 pr-4 py-3 font-body text-[15px] text-navy outline-none focus:border-teal" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              {['This month', 'Next month', 'All'].map(f => (
                <button key={f} onClick={() => setDateF(f)} className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-colors ${dateF === f ? 'bg-navy text-white' : 'bg-white border border-edge text-navy hover:border-teal'}`}>{f}</button>
              ))}
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-white border border-edge px-4 py-2 font-body text-sm font-medium text-navy hover:border-teal">Location<Icon name="chevronDown" size={15} color="#6A8A88" /></button>
            <div className="inline-flex items-center gap-1 rounded-full bg-white border border-edge px-3 py-1.5">
              {[['all', '🌐'], ['am', '🇦🇲'], ['ru', '🇷🇺'], ['en', '🇬🇧']].map(([k, f]) => (
                <button key={k} onClick={() => setLang(k)} className={`px-1.5 text-base rounded-full transition-all ${lang === k ? 'scale-110' : 'opacity-45 hover:opacity-90'}`}>{f}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {TOURS.map(t => <TourCard key={t.id} tour={t} navigate={navigate} />)}
        </div>
      </div>
    </Shell>
  );
}

/* ===================== TOUR DETAIL ===================== */
const ROADMAP = [
  { title: 'Garni Temple', sub: 'The only standing Greco-Roman colonnaded temple in the former USSR, perched above the Azat gorge.' },
  { title: 'Symphony of Stones', sub: 'A short walk down the canyon to the towering hexagonal basalt columns.' },
  { title: 'Geghard Monastery', sub: 'Rock-hewn churches carved directly into the cliff — a UNESCO World Heritage site. Lunch in the village.' },
];

function TourDetailPage({ navigate, id }) {
  const tour = TOURS.find(t => t.id === id) || TOURS[0];
  return (
    <Shell navigate={navigate} page="tours">
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <button onClick={() => navigate('tours')} className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-muted hover:text-teal mb-6"><Icon name="chevronLeft" size={16} color="currentColor" />Back to tours</button>
        <div className="grid lg:grid-cols-[1fr_360px] grid-cols-1 gap-10 items-start">
          {/* left */}
          <div>
            <div className="relative h-[360px] rounded-[14px] overflow-hidden mb-3"><Scenery variant={tour.variant} /></div>
            <div className="flex gap-3 mb-8">
              {[tour.variant, (tour.variant + 1) % 6, (tour.variant + 2) % 6, (tour.variant + 3) % 6].map((v, i) => (
                <div key={i} className={`relative h-[72px] flex-1 rounded-lg overflow-hidden cursor-pointer ${i === 0 ? 'ring-2 ring-amber' : 'opacity-70 hover:opacity-100'}`}><Scenery variant={v} sun={false} /></div>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="rounded-full bg-aqua px-3 py-1 font-body text-xs font-bold text-teal">{tour.tag}</span>
              <span className="inline-flex items-center gap-1.5 font-body text-sm text-muted"><Icon name="globe" size={14} color="#6A8A88" />{tour.lang}</span>
              <span className="inline-flex items-center gap-1.5 font-body text-sm text-muted"><Icon name="users" size={14} color="#6A8A88" />{tour.seats} seats available</span>
            </div>
            <h1 className="font-display text-[44px] font-bold text-navy leading-[1.05] mb-2">{tour.name}</h1>
            <div className="inline-flex items-center gap-1.5 font-body text-muted mb-6"><Icon name="calendar" size={16} color="#1A7A8A" />{tour.date} · Departs 08:00 from Republic Square</div>
            <p className="font-body text-[15px] text-navy/80 leading-[1.7] mb-10 max-w-[640px]">A full day through the Azat valley, tracing two thousand years of Armenian history — from a Hellenistic temple to chambers carved deep into living rock. Comfortable transport, expert guide, and lunch in a mountain village included.</p>

            {/* roadmap */}
            <div className="font-body text-xs font-bold tracking-widest text-amber mb-5">ROUTE</div>
            <div className="mb-10">
              {ROADMAP.map((s, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex flex-col items-center w-9 flex-none">
                    <div className="w-9 h-9 rounded-full bg-amber text-white flex items-center justify-center font-mono font-bold text-sm shadow-[0_4px_10px_rgba(226,104,94,0.32)] z-10">{i + 1}</div>
                    {i < ROADMAP.length - 1 && <div className="w-0.5 flex-1 my-1" style={{ background: 'repeating-linear-gradient(180deg,#1A7A8A 0 6px,transparent 6px 12px)' }} />}
                  </div>
                  <div className={i < ROADMAP.length - 1 ? 'pb-7' : 'pb-1'}>
                    <h3 className="font-display text-2xl font-bold text-navy leading-tight mb-1.5">{s.title}</h3>
                    <p className="font-body text-[15px] text-muted leading-relaxed mb-3 max-w-[520px]">{s.sub}</p>
                    <div className="flex gap-2.5">
                      {[0, 1, 2].map(p => <div key={p} className="relative w-20 h-14 rounded-lg overflow-hidden"><Scenery variant={(tour.variant + i + p) % 6} sun={false} /></div>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* map */}
            <div className="font-body text-xs font-bold tracking-widest text-amber mb-4">ROUTE MAP</div>
            <WebMap />
          </div>

          {/* right sticky */}
          <aside className="lg:sticky lg:top-[88px]">
            <div className="rounded-[14px] border border-edge bg-white shadow-[0_10px_30px_rgba(26,58,92,0.1)] p-6">
              <h3 className="font-display text-2xl font-bold text-navy leading-tight mb-1">{tour.name}</h3>
              <div className="inline-flex items-center gap-1.5 font-body text-sm text-muted mb-5"><Icon name="calendar" size={14} color="#6A8A88" />{tour.date}</div>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="font-mono text-3xl font-bold text-navy">{tour.price}</span><span className="font-body text-muted">֏ / person</span>
              </div>
              <div className="font-body text-[11px] font-bold tracking-widest text-muted mb-2">DEPARTS IN</div>
              <div className="mb-5"><Countdown target={tour.target} size="xl" /></div>
              <div className="flex items-center justify-between rounded-xl bg-aqua px-4 py-3 mb-5">
                <span className="font-body text-sm text-muted">Seats remaining</span>
                <span className="font-mono font-bold text-navy">{tour.seats} / 18</span>
              </div>
              <Btn variant="amber" size="lg" full icon="arrowRight" onClick={() => navigate('book', tour.id)}>Book This Tour</Btn>
            </div>
          </aside>
        </div>
      </div>
    </Shell>
  );
}

function WebMap() {
  return (
    <div className="relative h-[300px] rounded-[14px] overflow-hidden border border-edge" style={{ background: '#e9f4f1' }}>
      <svg width="100%" height="100%" viewBox="0 0 900 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
        <rect width="900" height="300" fill="#e6f3ef" />
        {[60, 120, 180, 240].map(y => <line key={'h' + y} x1="0" y1={y} x2="900" y2={y} stroke="#d2e8e2" strokeWidth="1" />)}
        {[150, 300, 450, 600, 750].map(x => <line key={'v' + x} x1={x} y1="0" x2={x} y2="300" stroke="#d2e8e2" strokeWidth="1" />)}
        <path d="M-20 90 Q 220 140 360 100 T 920 160" stroke="#a9dcd6" strokeWidth="14" fill="none" />
        <path d="M120 250 L 320 200 L 500 150 L 680 95 L 800 60" stroke="#E2685E" strokeWidth="3.5" fill="none" strokeDasharray="2 9" strokeLinecap="round" />
      </svg>
      {[[120, 250, '1'], [500, 150, '2'], [800, 60, '3']].map(([x, y, n]) => (
        <div key={n} className="absolute" style={{ left: (x / 900 * 100) + '%', top: (y / 300 * 100) + '%', transform: 'translate(-50%,-100%)' }}>
          <div className="w-7 h-7 flex items-center justify-center" style={{ borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: '#E2685E', boxShadow: '0 4px 10px rgba(226,104,94,0.4)' }}>
            <span className="font-mono font-bold text-xs text-white" style={{ transform: 'rotate(45deg)' }}>{n}</span>
          </div>
        </div>
      ))}
      <div className="absolute bottom-3 right-3 rounded-lg bg-white/85 px-2.5 py-1 font-body text-[10px] font-bold tracking-wide text-muted">YANDEX MAPS</div>
    </div>
  );
}

/* ===================== BOOKING ===================== */
function BookingPage({ navigate, id }) {
  const tour = TOURS.find(t => t.id === id) || TOURS[0];
  const [seats, setSeats] = React.useState(2);
  const unit = parseInt(tour.price.replace(/\s/g, ''), 10);
  const total = (unit * seats).toLocaleString('ru-RU');
  return (
    <Shell navigate={navigate} page="tours">
      <div className="mx-auto max-w-[1100px] px-6 py-10">
        <button onClick={() => navigate('detail', tour.id)} className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-muted hover:text-teal mb-6"><Icon name="chevronLeft" size={16} color="currentColor" />Back to tour</button>
        <h1 className="font-display text-[40px] font-bold text-navy leading-none mb-8">Request Your Booking</h1>
        <div className="grid lg:grid-cols-[1fr_380px] grid-cols-1 gap-10 items-start">
          {/* form */}
          <div className="grid gap-6">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
              <Field label="First name"><input defaultValue="Areg" className="hb-in" /></Field>
              <Field label="Last name"><input defaultValue="Petrosyan" className="hb-in" /></Field>
            </div>
            <Field label="Phone number">
              <div className="flex items-center rounded-xl border border-edge bg-white focus-within:border-teal">
                <span className="font-mono text-sm text-muted px-3.5 border-r border-edge">+374</span>
                <input defaultValue="91 23 45 67" className="flex-1 bg-transparent px-3 py-3 font-body text-[15px] text-navy outline-none" />
              </div>
            </Field>
            <Field label="Number of seats">
              <div className="flex items-center justify-between rounded-xl border border-edge bg-white px-4 py-2.5 max-w-xs">
                <span className="font-body text-sm text-muted">Travellers</span>
                <div className="flex items-center gap-5">
                  <button onClick={() => setSeats(s => Math.max(1, s - 1))} className="w-9 h-9 rounded-lg bg-teal text-white flex items-center justify-center active:scale-90 transition-transform"><Icon name="minus" size={18} color="#fff" /></button>
                  <span className="font-mono text-xl font-bold text-navy w-6 text-center">{seats}</span>
                  <button onClick={() => setSeats(s => Math.min(tour.seats, s + 1))} className="w-9 h-9 rounded-lg bg-teal text-white flex items-center justify-center active:scale-90 transition-transform"><Icon name="plus" size={18} color="#fff" /></button>
                </div>
              </div>
            </Field>
            <Field label="Notes (optional)"><textarea rows="4" placeholder="Dietary needs, pickup point, questions…" className="hb-in resize-none" /></Field>
          </div>

          {/* summary */}
          <aside className="lg:sticky lg:top-[88px] rounded-[14px] border border-edge bg-white shadow-[0_10px_30px_rgba(26,58,92,0.1)] overflow-hidden">
            <div className="relative h-[120px]"><Scenery variant={tour.variant} /></div>
            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-navy leading-tight mb-1">{tour.name}</h3>
              <div className="inline-flex items-center gap-1.5 font-body text-sm text-muted mb-5"><Icon name="calendar" size={14} color="#6A8A88" />{tour.date}</div>
              <div className="flex justify-between font-body text-sm text-navy mb-2"><span className="text-muted">{seats} × {tour.price} ֏</span><span className="font-mono">{total} ֏</span></div>
              <div className="flex justify-between items-baseline pt-3 mt-1 border-t border-edge mb-5">
                <span className="font-body font-bold text-navy">Total</span><span className="font-mono text-2xl font-bold text-navy">{total} <span className="text-base text-muted">֏</span></span>
              </div>
              <div className="rounded-xl bg-aqua px-4 py-3 mb-5 font-body text-[13px] text-muted leading-snug">Payment is confirmed offline — no online payment required. We'll contact you to arrange the details.</div>
              <Btn variant="amber" size="lg" full icon="check">Send Request</Btn>
            </div>
          </aside>
        </div>
      </div>
    </Shell>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block font-body text-sm font-bold text-navy mb-2">{label}</span>
      {children}
    </label>
  );
}

/* ===================== MY TOURS ===================== */
const MY = [
  { id: 'geghard', status: 'confirmed' }, { id: 'sevan', status: 'pending' },
  { id: 'tatev', status: 'paid' }, { id: 'dilijan', status: 'cancelled' },
];
function MyToursPage({ navigate }) {
  const [tab, setTab] = React.useState('upcoming');
  return (
    <Shell navigate={navigate} page="my-tours">
      <div className="bg-aqua border-b border-edge">
        <div className="mx-auto max-w-[1100px] px-6 py-10">
          <h1 className="font-display text-[42px] font-bold text-navy leading-none mb-5">My Tours</h1>
          <div className="flex gap-2">
            {[['upcoming', 'Upcoming'], ['past', 'Past']].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} className={`rounded-full px-5 py-2 font-body text-sm font-bold transition-colors ${tab === k ? 'bg-navy text-white' : 'bg-white border border-edge text-navy hover:border-teal'}`}>{l}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1100px] px-6 py-8 grid gap-5">
        {MY.map(({ id, status }) => {
          const t = TOURS.find(x => x.id === id);
          return (
            <div key={id} className="flex gap-5 bg-white rounded-[14px] border border-edge overflow-hidden hover:shadow-[0_12px_30px_rgba(26,58,92,0.1)] transition-shadow">
              <div className="relative w-[200px] flex-none"><Scenery variant={t.variant} /></div>
              <div className="flex-1 py-5 pr-6 flex flex-col justify-center">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-display text-2xl font-bold text-navy leading-tight truncate min-w-0">{t.name}</h3>
                  <StatusBadge status={status} />
                </div>
                <div className="flex items-center gap-5 text-muted mb-4">
                  <span className="inline-flex items-center gap-1.5 font-body text-sm"><Icon name="calendar" size={14} color="#6A8A88" />{t.date}</span>
                  <span className="inline-flex items-center gap-1.5 font-body text-sm"><Icon name="pin" size={14} color="#6A8A88" />{t.loc}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Countdown target={t.target} size="sm" />
                  <button onClick={() => navigate('detail', id)} className="inline-flex items-center gap-1 font-body text-sm font-bold text-teal hover:gap-2 transition-all">View details<Icon name="chevronRight" size={15} color="#1A7A8A" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}

/* ===================== PROFILE ===================== */
function ProfilePage({ navigate }) {
  const [lang, setLang] = React.useState('en');
  return (
    <Shell navigate={navigate} page="profile">
      <div className="bg-aqua border-b border-edge">
        <div className="mx-auto max-w-[900px] px-6 py-12 flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-[0_8px_24px_rgba(26,58,92,0.12)] flex items-center justify-center font-display text-4xl font-bold text-teal">AP</div>
          <div>
            <h1 className="font-display text-4xl font-bold text-navy leading-none mb-1.5 whitespace-nowrap">Areg Petrosyan</h1>
            <span className="font-body text-muted">areg.p@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[900px] px-6 py-10 grid gap-10">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <Field label="Phone number">
            <div className="flex items-center rounded-xl border border-edge bg-white">
              <span className="font-mono text-sm text-muted px-3.5 border-r border-edge">+374</span>
              <input defaultValue="91 23 45 67" className="flex-1 bg-transparent px-3 py-3 font-body text-[15px] text-navy outline-none" />
            </div>
          </Field>
          <div>
            <span className="block font-body text-sm font-bold text-navy mb-2">Language</span>
            <div className="flex gap-2">
              {[['hy', '🇦🇲', 'Armenian'], ['ru', '🇷🇺', 'Russian'], ['en', '🇬🇧', 'English']].map(([k, f, l]) => (
                <button key={k} onClick={() => setLang(k)} className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-2 py-3 font-body text-sm font-bold transition-colors ${lang === k ? 'bg-navy text-white' : 'bg-white border border-edge text-navy hover:border-teal'}`}><span className="text-base">{f}</span>{l}</button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-navy mb-4">Booking history</h2>
          <div className="grid gap-3">
            {MY.map(({ id, status }) => {
              const t = TOURS.find(x => x.id === id);
              return (
                <div key={id} className="flex items-center gap-4 bg-white rounded-xl border border-edge px-4 py-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-none"><Scenery variant={t.variant} sun={false} /></div>
                  <div className="flex-1"><div className="font-display text-lg font-bold text-navy leading-tight">{t.name}</div><div className="font-body text-xs text-muted mt-0.5">{t.date}</div></div>
                  <StatusBadge status={status} />
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-navy mb-4">Need help?</h2>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-body text-sm font-bold text-white" style={{ background: '#25D366' }}><Icon name="phone" size={16} color="#fff" />WhatsApp</button>
            <button className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-body text-sm font-bold text-white" style={{ background: '#0088CC' }}><Icon name="send" size={15} color="#fff" />Telegram</button>
          </div>
        </div>

        <button onClick={() => navigate('home')} className="font-body text-sm text-muted hover:text-navy underline underline-offset-4 justify-self-start">Sign out</button>
      </div>
    </Shell>
  );
}

Object.assign(window, { HomePage, ToursPage, TourDetailPage, BookingPage, MyToursPage, ProfilePage });
