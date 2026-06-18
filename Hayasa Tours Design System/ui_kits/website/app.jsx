/* Hayasa Tours — website router. */

function App() {
  const [route, setRoute] = React.useState({ page: 'home', id: null });
  const navigate = (page, id = null) => { setRoute({ page, id }); window.scrollTo(0, 0); };

  let view;
  switch (route.page) {
    case 'tours': view = <ToursPage navigate={navigate} />; break;
    case 'detail': view = <TourDetailPage navigate={navigate} id={route.id} />; break;
    case 'book': view = <BookingPage navigate={navigate} id={route.id} />; break;
    case 'my-tours': view = <MyToursPage navigate={navigate} />; break;
    case 'profile': view = <ProfilePage navigate={navigate} />; break;
    case 'about':
    case 'contact':
    default: view = <HomePage navigate={navigate} />;
  }

  return (
    <>
      {view}
      <DemoNav route={route} navigate={navigate} />
    </>
  );
}

/* Floating page switcher — a review aid, not part of the site chrome. */
function DemoNav({ route, navigate }) {
  const [open, setOpen] = React.useState(true);
  const pages = [['home', 'Home'], ['tours', 'Tours'], ['detail', 'Detail'], ['book', 'Booking'], ['my-tours', 'My Tours'], ['profile', 'Profile']];
  return (
    <div className="fixed bottom-4 left-4 z-[100]">
      {open ? (
        <div className="rounded-2xl bg-navy/95 backdrop-blur shadow-2xl p-2 flex items-center gap-1">
          <span className="font-body text-[10px] font-bold tracking-widest text-white/40 px-2">PAGES</span>
          {pages.map(([k, l]) => {
            const active = route.page === k;
            return <button key={k} onClick={() => navigate(k, k === 'detail' || k === 'book' ? 'geghard' : null)}
              className={`rounded-lg px-2.5 py-1.5 font-body text-xs font-bold transition-colors ${active ? 'bg-yellow text-navy' : 'text-white/70 hover:bg-white/10'}`}>{l}</button>;
          })}
          <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white px-1.5"><Icon name="x" size={14} color="currentColor" /></button>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="rounded-full bg-navy text-white shadow-2xl px-4 py-2 font-body text-xs font-bold">Pages</button>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
