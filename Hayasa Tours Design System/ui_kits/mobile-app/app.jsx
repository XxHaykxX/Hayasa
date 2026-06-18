/* Hayasa Tours — LIGHT gallery of phone frames. */

function PhoneFrame({ label, active, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 'none' }}>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, letterSpacing: '0.5px',
        color: '#6A8A88', paddingLeft: 4 }}>{label}</div>
      <div className="hb-frame">
        <div className="hb-notch" />
        <div className="hb-viewport">
          <StatusBar />
          {children}
          <BottomNav active={active} />
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  return (
    <div className="hb-canvas">
      <div className="hb-canvas-head">
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '3px',
          color: '#1A7A8A' }}>ՀԱՅԱՍԱ TOURS</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600, color: '#1A3A5C',
          margin: '6px 0 4px' }}>Mobile App — Lagoon Bungalow</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6A8A88', margin: 0 }}>
          Light mode · airy lagoon · amber accents · Armenian / Russian / English</p>
      </div>
      <div className="hb-row">
        <PhoneFrame label="01 · Home" active="Home"><HomeScreen /></PhoneFrame>
        <PhoneFrame label="02 · Tour detail" active="Search"><DetailScreen /></PhoneFrame>
        <PhoneFrame label="03 · Booking" active="Search"><BookingScreen /></PhoneFrame>
        <PhoneFrame label="04 · My Tours" active="My Tours"><MyToursScreen /></PhoneFrame>
        <PhoneFrame label="05 · Profile" active="Profile"><ProfileScreen /></PhoneFrame>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Gallery />);
