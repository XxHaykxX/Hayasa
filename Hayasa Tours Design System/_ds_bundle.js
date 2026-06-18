/* @ds-bundle: {"format":3,"namespace":"HayasaToursDesignSystem_8521e9","components":[],"sourceHashes":{"ui_kits/mobile-app-light/app.jsx":"fe8b04702451","ui_kits/mobile-app-light/screens.jsx":"a131a9098764","ui_kits/mobile-app-light/ui.jsx":"95a835217325","ui_kits/mobile-app/app.jsx":"4cfdcfba0827","ui_kits/mobile-app/screens.jsx":"e9206a354c50","ui_kits/mobile-app/ui.jsx":"41c6fdf750a5","ui_kits/website/app.jsx":"17010e226425","ui_kits/website/pages.jsx":"a915be658ba2","ui_kits/website/ui.jsx":"539432c30ff5"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HayasaToursDesignSystem_8521e9 = window.HayasaToursDesignSystem_8521e9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/mobile-app-light/app.jsx
try { (() => {
/* Hayasa Tours — LIGHT gallery of phone frames. */

function PhoneFrame({
  label,
  active,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.5px',
      color: '#6A8A88',
      paddingLeft: 4
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "hb-frame"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hb-notch"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hb-viewport"
  }, /*#__PURE__*/React.createElement(StatusBar, null), children, /*#__PURE__*/React.createElement(BottomNav, {
    active: active
  }))));
}
function Gallery() {
  return /*#__PURE__*/React.createElement("div", {
    className: "hb-canvas"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hb-canvas-head"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '3px',
      color: '#1A7A8A'
    }
  }, "\u0540\u0531\u0545\u0531\u054D\u0531 TOURS"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 38,
      fontWeight: 600,
      color: '#1A3A5C',
      margin: '6px 0 4px'
    }
  }, "Mobile App \u2014 Lagoon Bungalow"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#6A8A88',
      margin: 0
    }
  }, "Light mode \xB7 airy lagoon \xB7 amber accents \xB7 Armenian / Russian / English")), /*#__PURE__*/React.createElement("div", {
    className: "hb-row"
  }, /*#__PURE__*/React.createElement(PhoneFrame, {
    label: "01 \xB7 Home",
    active: "Home"
  }, /*#__PURE__*/React.createElement(HomeScreen, null)), /*#__PURE__*/React.createElement(PhoneFrame, {
    label: "02 \xB7 Tour detail",
    active: "Search"
  }, /*#__PURE__*/React.createElement(DetailScreen, null)), /*#__PURE__*/React.createElement(PhoneFrame, {
    label: "03 \xB7 Booking",
    active: "Search"
  }, /*#__PURE__*/React.createElement(BookingScreen, null)), /*#__PURE__*/React.createElement(PhoneFrame, {
    label: "04 \xB7 My Tours",
    active: "My Tours"
  }, /*#__PURE__*/React.createElement(MyToursScreen, null)), /*#__PURE__*/React.createElement(PhoneFrame, {
    label: "05 \xB7 Profile",
    active: "Profile"
  }, /*#__PURE__*/React.createElement(ProfileScreen, null))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Gallery, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile-app-light/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile-app-light/screens.jsx
try { (() => {
/* Hayasa Tours — LIGHT app screens. Composes light primitives from ui.jsx. */

const NOW = Date.now();
const DAY = 86400000;
const T = {
  geghard: NOW + 3 * DAY + 7 * 3600000 + 42 * 60000,
  sevan: NOW + 9 * DAY + 5 * 3600000,
  tatev: NOW + 16 * DAY + 11 * 3600000,
  dilijan: NOW + 24 * DAY + 2 * 3600000
};

/* ===================== HOME ===================== */
function HomeScreen() {
  return /*#__PURE__*/React.createElement("div", {
    className: "hb-scroll",
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 20px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '2.5px',
      color: 'var(--teal)'
    }
  }, "\u0540\u0531\u0545\u0531\u054D\u0531 \xB7 HAYASA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      fontWeight: 600,
      color: 'var(--text)',
      lineHeight: 1,
      marginTop: 2
    }
  }, "\u0532\u0561\u0580\u0587, Areg")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hb-iconbtn"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 19,
    color: "var(--teal)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hb-iconbtn",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 19,
    color: "var(--teal)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 9,
      right: 10,
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--primary)',
      border: '2px solid var(--surface)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hb-card hb-shadow",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 190
    }
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: 0
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 14,
      left: 14,
      right: 14,
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hb-chip"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "flame",
    size: 12,
    color: "#1A3A5C"
  }), "Next departure"), /*#__PURE__*/React.createElement("span", {
    className: "hb-chip-ghost"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 11,
    color: "var(--primary)",
    fill: "var(--primary)"
  }), "4.9"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--text-dim)',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 13,
    color: "var(--teal)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 500
    }
  }, "Geghard \xB7 Garni \xB7 Azat Gorge")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 30,
      fontWeight: 600,
      color: 'var(--text)',
      margin: '0 0 16px',
      lineHeight: 1.05
    }
  }, "Monasteries of the Cliffs"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-2)',
      borderRadius: 12,
      padding: '14px 16px',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Countdown, {
    target: T.geghard,
    size: "lg"
  })), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    full: true,
    icon: "arrowRight"
  }, "Reserve your seat")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '24px 20px 12px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      fontWeight: 600,
      color: 'var(--text)',
      margin: 0
    }
  }, "Upcoming tours"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      fontWeight: 700,
      color: 'var(--teal)'
    }
  }, "See all")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: '0 20px 8px'
    }
  }, /*#__PURE__*/React.createElement(TourCard, {
    variant: 1,
    name: "Lake Sevan & Sevanavank",
    loc: "Gegharkunik",
    date: "Jun 26",
    target: T.sevan
  }), /*#__PURE__*/React.createElement(TourCard, {
    variant: 2,
    name: "Tatev & the Wings",
    loc: "Syunik \xB7 cable car",
    date: "Jul 3",
    target: T.tatev
  }), /*#__PURE__*/React.createElement(TourCard, {
    variant: 3,
    name: "Dilijan Forest Trails",
    loc: "Tavush",
    date: "Jul 11",
    target: T.dilijan
  })));
}
function TourCard({
  variant,
  name,
  loc,
  date,
  target
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hb-card hb-shadow",
    style: {
      display: 'flex',
      gap: 14,
      padding: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 92,
      height: 92,
      borderRadius: 12,
      overflow: 'hidden',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: variant,
    glow: false
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      color: 'var(--text-dim)',
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 11,
    color: "var(--teal)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      fontWeight: 500
    }
  }, loc)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 19,
      fontWeight: 600,
      color: 'var(--text)',
      lineHeight: 1.2,
      marginBottom: 8,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Countdown, {
    target: target,
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-body)',
      fontSize: 10.5,
      fontWeight: 600,
      color: 'var(--text-dim)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 11,
    color: "var(--text-dim)"
  }), date))));
}

/* ===================== TOUR DETAIL ===================== */
const ROADMAP = [{
  t: '08:00',
  title: 'Depart Republic Square',
  sub: 'Yerevan · meeting point at the fountains'
}, {
  t: '09:15',
  title: 'Garni Temple',
  sub: 'Hellenistic temple above the gorge'
}, {
  t: '11:00',
  title: 'Symphony of Stones',
  sub: 'Basalt columns in the Azat canyon'
}, {
  t: '13:30',
  title: 'Geghard Monastery',
  sub: 'Rock-hewn UNESCO complex + lunch'
}, {
  t: '17:00',
  title: 'Return to Yerevan',
  sub: 'Arrive ~18:30 at Republic Square'
}];
function DetailScreen() {
  return /*#__PURE__*/React.createElement("div", {
    className: "hb-scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      background: 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 260
    }
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: 0
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 6,
      left: 20,
      right: 20,
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hb-iconbtn hb-glass"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronLeft",
    size: 20,
    color: "var(--text)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hb-iconbtn hb-glass"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 19,
    color: "var(--text)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 14,
      left: 0,
      right: 0,
      display: 'flex',
      gap: 6,
      justifyContent: 'center'
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: i === 0 ? 18 : 6,
      height: 6,
      borderRadius: 3,
      background: i === 0 ? '#fff' : 'rgba(255,255,255,0.55)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hb-chip-sm"
  }, "Cultural"), /*#__PURE__*/React.createElement("span", {
    className: "hb-chip-sm"
  }, "Group tour"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text-dim)',
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 13,
    color: "var(--primary)",
    fill: "var(--primary)"
  }), "4.9 (212)")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 32,
      fontWeight: 600,
      color: 'var(--text)',
      margin: '0 0 14px',
      lineHeight: 1.05
    }
  }, "Monasteries of the Cliffs"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 18
    }
  }, [['clock', '1 day'], ['users', 'Max 18'], ['pin', '62 km']].map(([ic, tx]) => /*#__PURE__*/React.createElement("div", {
    key: tx,
    className: "hb-stat"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 16,
    color: "var(--teal)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      fontWeight: 600,
      color: 'var(--text)'
    }
  }, tx)))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--text-dim)',
      margin: '0 0 22px'
    }
  }, "A full day through the Azat valley \u2014 from the columned temple of Garni to the rock-cut chambers of Geghard, where chant still echoes off stone carved a thousand years ago. Guided in Armenian, Russian and English."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "route",
    size: 18,
    color: "var(--teal)"
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 21,
      fontWeight: 600,
      color: 'var(--text)',
      margin: 0
    }
  }, "Roadmap")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      paddingLeft: 4
    }
  }, ROADMAP.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 14,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 34,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      flex: 'none',
      background: 'var(--primary)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 13,
      boxShadow: '0 4px 10px rgba(226,104,94,0.30)',
      zIndex: 1
    }
  }, i + 1), i < ROADMAP.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 2,
      flex: 1,
      background: 'var(--teal)',
      opacity: 0.4
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: i < ROADMAP.length - 1 ? 22 : 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--teal)'
    }
  }, s.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text)',
      margin: '1px 0 2px'
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      color: 'var(--text-dim)',
      lineHeight: 1.4
    }
  }, s.sub))))), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 21,
      fontWeight: 600,
      color: 'var(--text)',
      margin: '8px 0 12px'
    }
  }, "Route map"), /*#__PURE__*/React.createElement(YandexMap, null), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      bottom: 0,
      background: 'var(--surface)',
      padding: '14px 20px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: 'var(--text-dim)'
    }
  }, "per person"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--text)'
    }
  }, "18 500 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-dim)'
    }
  }, "\u058F"))), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    icon: "arrowRight",
    style: {
      flex: 1
    }
  }, "Book Now")));
}
function YandexMap() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 180,
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: '#e9f4f1'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: "0 0 340 180",
    preserveAspectRatio: "xMidYMid slice",
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("rect", {
    width: "340",
    height: "180",
    fill: "#e6f3ef"
  }), [30, 70, 110, 150].map(y => /*#__PURE__*/React.createElement("line", {
    key: 'h' + y,
    x1: "0",
    y1: y,
    x2: "340",
    y2: y,
    stroke: "#d2e8e2",
    strokeWidth: "1"
  })), [60, 130, 200, 270].map(x => /*#__PURE__*/React.createElement("line", {
    key: 'v' + x,
    x1: x,
    y1: "0",
    x2: x,
    y2: "180",
    stroke: "#d2e8e2",
    strokeWidth: "1"
  })), /*#__PURE__*/React.createElement("path", {
    d: "M-10 40 Q 90 70 140 50 T 360 90",
    stroke: "#a9dcd6",
    strokeWidth: "8",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M40 150 L 110 120 L 175 95 L 250 60 L 300 35",
    stroke: "var(--primary)",
    strokeWidth: "3",
    fill: "none",
    strokeDasharray: "2 7",
    strokeLinecap: "round"
  })), [[40, 150, '1'], [175, 95, '3'], [300, 35, '5']].map(([x, y, n]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      position: 'absolute',
      left: x / 340 * 100 + '%',
      top: y / 180 * 100 + '%',
      transform: 'translate(-50%,-100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50% 50% 50% 0',
      transform: 'rotate(-45deg)',
      background: 'var(--primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 10px rgba(226,104,94,0.38)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      transform: 'rotate(45deg)',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 11,
      color: '#fff'
    }
  }, n)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 8,
      right: 8,
      padding: '4px 8px',
      borderRadius: 8,
      background: 'rgba(255,255,255,0.85)',
      fontFamily: 'var(--font-body)',
      fontSize: 9,
      fontWeight: 700,
      color: 'var(--text-dim)',
      letterSpacing: '0.5px'
    }
  }, "YANDEX MAPS"));
}

/* ===================== BOOKING ===================== */
function BookingScreen() {
  const [seats, setSeats] = React.useState(2);
  const price = 18500;
  return /*#__PURE__*/React.createElement("div", {
    className: "hb-scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '6px 20px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hb-iconbtn"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronLeft",
    size: 20,
    color: "var(--text)"
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      fontWeight: 600,
      color: 'var(--text)',
      margin: 0
    }
  }, "Reserve your seat")), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 20px 22px'
    },
    className: "hb-card hb-shadow"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      padding: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 56,
      height: 56,
      borderRadius: 10,
      overflow: 'hidden',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: 0,
    glow: false
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--text)',
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, "Monasteries of the Cliffs"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-dim)',
      marginTop: 3,
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 12,
    color: "var(--teal)"
  }), "Sat, Jun 20 \xB7 08:00")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Full name"
  }, /*#__PURE__*/React.createElement("input", {
    className: "hb-input",
    defaultValue: "Areg Petrosyan"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Phone number"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      color: 'var(--text-dim)',
      padding: '0 12px 0 14px',
      borderRight: '1px solid var(--border)'
    }
  }, "+374"), /*#__PURE__*/React.createElement("input", {
    className: "hb-input",
    style: {
      border: 'none',
      background: 'transparent',
      paddingLeft: 12
    },
    defaultValue: "91 23 45 67"
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Number of seats"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-dim)'
    }
  }, "Travellers"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "hb-counter",
    onClick: () => setSeats(s => Math.max(1, s - 1))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "minus",
    size: 18,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 20,
      fontWeight: 700,
      color: 'var(--text)',
      minWidth: 22,
      textAlign: 'center'
    }
  }, seats), /*#__PURE__*/React.createElement("button", {
    className: "hb-counter",
    onClick: () => setSeats(s => Math.min(18, s + 1))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 18,
    color: "#fff"
  }))))), /*#__PURE__*/React.createElement(Field, {
    label: "Language of guide"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, ['Հայերեն', 'Русский', 'English'].map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: l,
    className: 'hb-seg' + (i === 2 ? ' hb-seg-on' : ''),
    style: {
      flex: 1
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 16
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      bottom: 0,
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '14px 20px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--text-dim)'
    }
  }, seats, " \xD7 18 500 \u058F"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--text)'
    }
  }, (price * seats).toLocaleString('ru-RU'), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-dim)'
    }
  }, "\u058F"))), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    full: true,
    icon: "check"
  }, "Confirm booking")));
}
function Field({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--text)',
      marginBottom: 8,
      letterSpacing: '0.2px',
      background: 'var(--surface-2)',
      padding: '4px 10px',
      borderRadius: 7
    }
  }, label), children);
}

/* ===================== MY TOURS ===================== */
const MY_TOURS = [{
  name: 'Monasteries of the Cliffs',
  date: 'Jun 20, 2026',
  seats: 2,
  status: 'confirmed',
  variant: 0
}, {
  name: 'Lake Sevan & Sevanavank',
  date: 'Jun 26, 2026',
  seats: 1,
  status: 'pending',
  variant: 1
}, {
  name: 'Tbilisi Old Town',
  date: 'Jul 9, 2026',
  seats: 3,
  status: 'paid',
  variant: 2
}, {
  name: 'Dilijan Forest Trails',
  date: 'May 2, 2026',
  seats: 2,
  status: 'cancelled',
  variant: 3
}];
function MyToursScreen() {
  const [tab, setTab] = React.useState('upcoming');
  return /*#__PURE__*/React.createElement("div", {
    className: "hb-scroll",
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 30,
      fontWeight: 600,
      color: 'var(--text)',
      margin: '0 0 16px'
    }
  }, "My Tours"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 18
    }
  }, [['upcoming', 'Upcoming'], ['past', 'Past']].map(([k, l]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    onClick: () => setTab(k),
    className: 'hb-seg' + (tab === k ? ' hb-seg-on' : ''),
    style: {
      flex: 'none',
      padding: '8px 18px'
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: '0 20px 12px'
    }
  }, MY_TOURS.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "hb-card hb-shadow",
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 64,
      height: 64,
      borderRadius: 11,
      overflow: 'hidden',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: t.variant,
    glow: false
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--text)',
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, t.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 6,
      color: 'var(--text-dim)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      fontFamily: 'var(--font-body)',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 12,
    color: "var(--text-dim)"
  }), t.date), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      fontFamily: 'var(--font-body)',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 12,
    color: "var(--text-dim)"
  }), t.seats)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 12,
      paddingTop: 12,
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(StatusBadge, {
    status: t.status
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      fontWeight: 700,
      color: 'var(--teal)'
    }
  }, "Details ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRightSm",
    size: 14,
    color: "var(--teal)"
  })))))));
}

/* ===================== PROFILE ===================== */
function ProfileScreen() {
  const [lang, setLang] = React.useState('en');
  return /*#__PURE__*/React.createElement("div", {
    className: "hb-scroll",
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-2)',
      padding: '14px 20px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 84,
      height: 84,
      borderRadius: '50%',
      background: 'var(--surface)',
      border: '3px solid #fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 20px rgba(26,58,92,0.12)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 34,
      fontWeight: 600,
      color: 'var(--teal)'
    }
  }, "AP")), /*#__PURE__*/React.createElement("div", {
    className: "hb-iconbtn",
    style: {
      position: 'absolute',
      bottom: -2,
      right: -2,
      width: 28,
      height: 28
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 13,
    color: "var(--teal)"
  }))), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      fontWeight: 600,
      color: 'var(--text)',
      margin: '12px 0 2px',
      whiteSpace: 'nowrap'
    }
  }, "Areg Petrosyan"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--text-dim)'
    }
  }, "areg.p@gmail.com")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: '20px 20px 0'
    }
  }, [['12', 'Tours'], ['3', 'Countries'], ['4.9', 'Rating']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      flex: 1
    },
    className: "hb-card hb-shadow"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 8px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--teal)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--text-dim)',
      marginTop: 2
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--text-dim)',
      letterSpacing: '1px',
      marginBottom: 10
    }
  }, "LANGUAGE"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, [['hy', '🇦🇲', 'Հայերեն'], ['ru', '🇷🇺', 'Русский'], ['en', '🇬🇧', 'English']].map(([k, flag, l]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    onClick: () => setLang(k),
    className: 'hb-seg' + (lang === k ? ' hb-seg-on' : ''),
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, flag), l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--text-dim)',
      letterSpacing: '1px',
      marginBottom: 10
    }
  }, "NEED HELP?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "teal",
    icon: "phone",
    style: {
      flex: 1,
      fontSize: 14
    }
  }, "WhatsApp"), /*#__PURE__*/React.createElement(Btn, {
    variant: "teal",
    icon: "send",
    style: {
      flex: 1,
      fontSize: 14
    }
  }, "Telegram"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 20px 12px'
    }
  }, [['ticket', 'My bookings'], ['heart', 'Saved tours'], ['shield', 'Privacy & security']].map(([ic, l], i, a) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '15px 4px',
      borderBottom: i < a.length - 1 ? '1px solid var(--border)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 19,
    color: "var(--teal)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-body)',
      fontSize: 14.5,
      fontWeight: 500,
      color: 'var(--text)'
    }
  }, l), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRightSm",
    size: 17,
    color: "var(--text-dim)"
  })))));
}

/* ===================== BOTTOM NAV ===================== */
function BottomNav({
  active
}) {
  const items = [['home', 'Home'], ['search', 'Search'], ['ticket', 'My Tours'], ['user', 'Profile']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '10px 8px 22px',
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)',
      flex: 'none'
    }
  }, items.map(([ic, l]) => {
    const on = l === active;
    return /*#__PURE__*/React.createElement("div", {
      key: l,
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 23,
      color: on ? 'var(--tab-active)' : 'var(--tab-inactive)',
      fill: on ? 'rgba(26,58,92,0.10)' : 'none',
      stroke: on ? 2.2 : 2
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 10,
        fontWeight: on ? 700 : 500,
        color: on ? 'var(--tab-active)' : 'var(--tab-inactive)'
      }
    }, l));
  }));
}
Object.assign(window, {
  HomeScreen,
  DetailScreen,
  BookingScreen,
  MyToursScreen,
  ProfileScreen,
  BottomNav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile-app-light/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile-app-light/ui.jsx
try { (() => {
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
  chevronRightSm: ['M9 18l6-6-6-6']
};
function Icon({
  name,
  size = 22,
  color = 'currentColor',
  stroke = 2,
  fill = 'none',
  style
}) {
  const paths = ICON_PATHS[name] || [];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: style
  }, paths.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d
  })));
}

/* ---------- Scenery: light lagoon-lake landscape placeholder ---------- */
const SCENERY_VARIANTS = [{
  sky: 'linear-gradient(180deg, #e6f5f2 0%, #f3faf8 55%)',
  ridges: ['polygon(0 60%,20% 44%,38% 56%,56% 40%,74% 52%,90% 42%,100% 50%,100% 70%,0 70%)', 'polygon(0 70%,24% 58%,46% 68%,66% 56%,84% 66%,100% 60%,100% 100%,0 100%)'],
  near: '#b6dcd6'
}, {
  sky: 'linear-gradient(180deg, #e3f3f0 0%, #f1f9f7 55%)',
  ridges: ['polygon(0 52%,22% 62%,42% 48%,60% 58%,80% 46%,100% 56%,100% 70%,0 70%)', 'polygon(0 72%,26% 60%,48% 70%,70% 58%,88% 68%,100% 62%,100% 100%,0 100%)'],
  near: '#abd4ce'
}, {
  sky: 'linear-gradient(180deg, #e9f4ee 0%, #f4faf6 55%)',
  ridges: ['polygon(0 58%,16% 46%,38% 58%,56% 42%,74% 54%,90% 44%,100% 52%,100% 70%,0 70%)', 'polygon(0 74%,24% 62%,46% 72%,66% 60%,84% 70%,100% 64%,100% 100%,0 100%)'],
  near: '#bdded6'
}, {
  sky: 'linear-gradient(180deg, #e4f2f4 0%, #f2f9fa 55%)',
  ridges: ['polygon(0 56%,22% 48%,42% 60%,60% 46%,80% 56%,100% 46%,100% 70%,0 70%)', 'polygon(0 72%,20% 64%,44% 72%,68% 62%,86% 70%,100% 64%,100% 100%,0 100%)'],
  near: '#aed6d3'
}];
function Scenery({
  variant = 0,
  glow = true,
  children,
  style
}) {
  const v = SCENERY_VARIANTS[variant % SCENERY_VARIANTS.length];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      background: v.sky,
      ...style
    }
  }, glow && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '72%',
      top: '18%',
      width: 90,
      height: 90,
      transform: 'translate(-50%,-50%)',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,226,11,0.5) 0%, rgba(255,226,11,0) 68%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: '#9bc4cf',
      clipPath: v.ridges[0],
      opacity: 0.55
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: v.near,
      clipPath: v.ridges[1]
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '30%',
      background: 'linear-gradient(180deg, #7bc2c0 0%, #5bafb0 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '30%',
      opacity: 0.25,
      backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 9px)'
    }
  }), children);
}

/* ---------- Countdown ---------- */
function useCountdown(target) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  let diff = Math.max(0, Math.floor((target - now) / 1000));
  const d = Math.floor(diff / 86400);
  diff -= d * 86400;
  const h = Math.floor(diff / 3600);
  diff -= h * 3600;
  const m = Math.floor(diff / 60);
  const s = diff - m * 60;
  const pad = n => String(n).padStart(2, '0');
  return {
    d: pad(d),
    h: pad(h),
    m: pad(m),
    s: pad(s)
  };
}
function Countdown({
  target,
  size = 'lg'
}) {
  const t = useCountdown(target);
  const big = size === 'lg';
  const units = [[t.d, 'DAYS'], [t.h, 'HRS'], [t.m, 'MIN'], [t.s, 'SEC']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: big ? 10 : 6,
      alignItems: 'flex-start'
    }
  }, units.map(([val, label], i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: label
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      color: 'var(--primary)',
      fontSize: big ? 30 : 17,
      lineHeight: 1,
      letterSpacing: '-0.5px'
    }
  }, val), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: big ? 9 : 8,
      fontWeight: 700,
      letterSpacing: '1.5px',
      color: 'var(--text-faint)'
    }
  }, label)), i < 3 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      color: 'rgba(226,104,94,0.4)',
      fontSize: big ? 26 : 15,
      lineHeight: 1,
      marginTop: big ? 1 : 0
    }
  }, ":"))));
}

/* ---------- StatusBadge: filled pills ---------- */
const STATUS = {
  pending: {
    bg: '#FFE20B',
    fg: '#1A3A5C',
    label: 'Pending'
  },
  confirmed: {
    bg: '#2A9D6A',
    fg: '#FFFFFF',
    label: 'Confirmed'
  },
  paid: {
    bg: '#1A3A5C',
    fg: '#FFFFFF',
    label: 'Paid'
  },
  cancelled: {
    bg: '#D43A3A',
    fg: '#FFFFFF',
    label: 'Cancelled'
  }
};
function StatusBadge({
  status
}) {
  const s = STATUS[status] || STATUS.pending;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '5px 12px',
      borderRadius: 999,
      background: s.bg,
      color: s.fg,
      fontFamily: 'var(--font-body)',
      fontSize: 11.5,
      fontWeight: 700,
      letterSpacing: '0.2px'
    }
  }, s.label);
}

/* ---------- Button ---------- */
function Btn({
  children,
  variant = 'primary',
  icon,
  full,
  onClick,
  style
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    border: 'none',
    borderRadius: 12,
    padding: '14px 20px',
    width: full ? '100%' : 'auto',
    transition: 'transform .12s ease, background .15s ease',
    userSelect: 'none',
    ...style
  };
  const variants = {
    primary: {
      background: 'var(--primary)',
      color: 'var(--on-primary)',
      boxShadow: '0 6px 16px rgba(226,104,94,0.32)'
    },
    teal: {
      background: 'var(--teal)',
      color: '#fff',
      boxShadow: '0 6px 16px rgba(26,122,138,0.22)'
    },
    secondary: {
      background: 'var(--surface)',
      color: 'var(--text)',
      border: '1px solid var(--border)'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    className: 'hb-btn hb-btn-' + variant,
    style: {
      ...base,
      ...variants[variant]
    },
    onClick: onClick
  }, children, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18,
    color: variant === 'secondary' ? 'currentColor' : '#fff'
  }));
}

/* ---------- StatusBar (dark glyphs on light) ---------- */
function StatusBar() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 26px 0 30px',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--text)'
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "11",
    viewBox: "0 0 17 11",
    fill: "var(--text)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "6",
    width: "3",
    height: "5",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.5",
    y: "4",
    width: "3",
    height: "7",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2",
    width: "3",
    height: "9",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.5",
    y: "0",
    width: "3",
    height: "11",
    rx: "1"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "11",
    viewBox: "0 0 22 11",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "1",
    width: "17",
    height: "9",
    rx: "2.5",
    stroke: "var(--text)",
    opacity: "0.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2.5",
    y: "2.5",
    width: "12",
    height: "6",
    rx: "1.5",
    fill: "var(--text)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "19.5",
    y: "3.5",
    width: "1.5",
    height: "4",
    rx: "0.75",
    fill: "var(--text)",
    opacity: "0.4"
  }))));
}
Object.assign(window, {
  Icon,
  Scenery,
  Countdown,
  useCountdown,
  StatusBadge,
  Btn,
  StatusBar,
  STATUS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile-app-light/ui.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile-app/app.jsx
try { (() => {
/* Hayasa Tours — gallery of phone frames showing all 5 screens. */

function PhoneFrame({
  label,
  active,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.5px',
      color: '#7a937a',
      paddingLeft: 4
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "hb-frame"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hb-notch"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hb-viewport"
  }, /*#__PURE__*/React.createElement(StatusBar, null), children, /*#__PURE__*/React.createElement(BottomNav, {
    active: active
  }))));
}
function Gallery() {
  return /*#__PURE__*/React.createElement("div", {
    className: "hb-canvas"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hb-canvas-head"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '3px',
      color: '#FFE20B'
    }
  }, "\u0540\u0531\u0545\u0531\u054D\u0531 TOURS"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 38,
      fontWeight: 600,
      color: '#F0FFE8',
      margin: '6px 0 4px'
    }
  }, "Mobile App \u2014 UI Kit"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#7a937a',
      margin: 0
    }
  }, "Dark mode \xB7 lime lanterns on ancient dark \xB7 Armenian / Russian / English")), /*#__PURE__*/React.createElement("div", {
    className: "hb-row"
  }, /*#__PURE__*/React.createElement(PhoneFrame, {
    label: "01 \xB7 Home",
    active: "Home"
  }, /*#__PURE__*/React.createElement(HomeScreen, null)), /*#__PURE__*/React.createElement(PhoneFrame, {
    label: "02 \xB7 Tour detail",
    active: "Search"
  }, /*#__PURE__*/React.createElement(DetailScreen, null)), /*#__PURE__*/React.createElement(PhoneFrame, {
    label: "03 \xB7 Booking",
    active: "Search"
  }, /*#__PURE__*/React.createElement(BookingScreen, null)), /*#__PURE__*/React.createElement(PhoneFrame, {
    label: "04 \xB7 My Tours",
    active: "My Tours"
  }, /*#__PURE__*/React.createElement(MyToursScreen, null)), /*#__PURE__*/React.createElement(PhoneFrame, {
    label: "05 \xB7 Profile",
    active: "Profile"
  }, /*#__PURE__*/React.createElement(ProfileScreen, null))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Gallery, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile-app/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile-app/screens.jsx
try { (() => {
/* Hayasa Tours — app screens. Composes primitives from ui.jsx (on window). */

const NOW = Date.now();
const DAY = 86400000;
const T = {
  geghard: NOW + 3 * DAY + 7 * 3600000 + 42 * 60000,
  // hero, ~3d
  sevan: NOW + 9 * DAY + 5 * 3600000,
  tatev: NOW + 16 * DAY + 11 * 3600000,
  dilijan: NOW + 24 * DAY + 2 * 3600000
};

/* ===================== HOME ===================== */
function HomeScreen() {
  return /*#__PURE__*/React.createElement("div", {
    className: "hb-scroll",
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 20px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '2.5px',
      color: 'var(--text-faint)'
    }
  }, "\u0540\u0531\u0545\u0531\u054D\u0531 \xB7 HAYASA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      fontWeight: 600,
      color: 'var(--text)',
      lineHeight: 1,
      marginTop: 2
    }
  }, "\u0532\u0561\u0580\u0587, Areg")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hb-iconbtn"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 19,
    color: "var(--text-dim)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hb-iconbtn",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 19,
    color: "var(--text-dim)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 9,
      right: 10,
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--highlight)',
      border: '2px solid var(--surface)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 340,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-card)'
    }
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: 0
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hb-chip"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "flame",
    size: 12,
    color: "var(--on-primary)"
  }), "Next departure"), /*#__PURE__*/React.createElement("span", {
    className: "hb-chip-ghost"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 11,
    color: "var(--primary)",
    fill: "var(--primary)"
  }), "4.9")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--text-dim)',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 13,
    color: "var(--highlight)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 500
    }
  }, "Geghard \xB7 Garni \xB7 Azat Gorge")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 36,
      fontWeight: 600,
      color: 'var(--text)',
      margin: '0 0 16px',
      lineHeight: 1.0
    }
  }, "Monasteries of the Cliffs"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(13,26,13,0.55)',
      backdropFilter: 'blur(6px)',
      borderRadius: 14,
      border: '1px solid var(--border)',
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Countdown, {
    target: T.geghard,
    size: "lg"
  }), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    full: true,
    icon: "arrowRight"
  }, "Reserve your seat")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '24px 20px 12px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      fontWeight: 600,
      color: 'var(--text)',
      margin: 0
    }
  }, "Upcoming tours"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      fontWeight: 600,
      color: 'var(--primary)'
    }
  }, "See all")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: '0 20px 8px'
    }
  }, /*#__PURE__*/React.createElement(TourCard, {
    variant: 1,
    name: "Lake Sevan & Sevanavank",
    loc: "Gegharkunik",
    date: "Jun 26",
    seats: "6 seats left",
    target: T.sevan
  }), /*#__PURE__*/React.createElement(TourCard, {
    variant: 2,
    name: "Tatev & the Wings",
    loc: "Syunik \xB7 cable car",
    date: "Jul 3",
    seats: "11 seats left",
    target: T.tatev
  }), /*#__PURE__*/React.createElement(TourCard, {
    variant: 3,
    name: "Dilijan Forest Trails",
    loc: "Tavush",
    date: "Jul 11",
    seats: "3 seats left",
    target: T.dilijan
  })));
}
function TourCard({
  variant,
  name,
  loc,
  date,
  seats,
  target
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hb-card",
    style: {
      display: 'flex',
      gap: 14,
      padding: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 92,
      height: 92,
      borderRadius: 12,
      overflow: 'hidden',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: variant,
    glow: false
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      color: 'var(--text-faint)',
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 11,
    color: "var(--text-faint)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      fontWeight: 500
    }
  }, loc)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 19,
      fontWeight: 600,
      color: 'var(--text)',
      lineHeight: 1.1,
      marginBottom: 8,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Countdown, {
    target: target,
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-body)',
      fontSize: 10.5,
      fontWeight: 600,
      color: 'var(--text-dim)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 11,
    color: "var(--text-dim)"
  }), date))));
}

/* ===================== TOUR DETAIL ===================== */
const ROADMAP = [{
  t: '08:00',
  title: 'Depart Republic Square',
  sub: 'Yerevan · meeting point at the fountains'
}, {
  t: '09:15',
  title: 'Garni Temple',
  sub: 'Hellenistic temple above the gorge'
}, {
  t: '11:00',
  title: 'Symphony of Stones',
  sub: 'Basalt columns in the Azat canyon'
}, {
  t: '13:30',
  title: 'Geghard Monastery',
  sub: 'Rock-hewn UNESCO complex + lunch'
}, {
  t: '17:00',
  title: 'Return to Yerevan',
  sub: 'Arrive ~18:30 at Republic Square'
}];
function DetailScreen() {
  return /*#__PURE__*/React.createElement("div", {
    className: "hb-scroll",
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 260
    }
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: 0
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 6,
      left: 20,
      right: 20,
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hb-iconbtn hb-glass"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronLeft",
    size: 20,
    color: "var(--text)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hb-iconbtn hb-glass"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 19,
    color: "var(--text)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 14,
      left: 0,
      right: 0,
      display: 'flex',
      gap: 6,
      justifyContent: 'center'
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: i === 0 ? 18 : 6,
      height: 6,
      borderRadius: 3,
      background: i === 0 ? 'var(--primary)' : 'rgba(240,255,232,0.4)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hb-chip-sm"
  }, "Cultural"), /*#__PURE__*/React.createElement("span", {
    className: "hb-chip-sm"
  }, "Group tour"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text-dim)',
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 13,
    color: "var(--primary)",
    fill: "var(--primary)"
  }), "4.9 (212)")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 32,
      fontWeight: 600,
      color: 'var(--text)',
      margin: '0 0 14px',
      lineHeight: 1.05
    }
  }, "Monasteries of the Cliffs"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 18
    }
  }, [['clock', '1 day'], ['users', 'Max 18'], ['pin', '62 km']].map(([ic, tx]) => /*#__PURE__*/React.createElement("div", {
    key: tx,
    className: "hb-stat"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 16,
    color: "var(--primary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      fontWeight: 600,
      color: 'var(--text)'
    }
  }, tx)))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--text-dim)',
      margin: '0 0 22px'
    }
  }, "A full day through the Azat valley \u2014 from the columned temple of Garni to the rock-cut chambers of Geghard, where chant still echoes off stone carved a thousand years ago. Guided in Armenian, Russian and English."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "route",
    size: 18,
    color: "var(--highlight)"
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 21,
      fontWeight: 600,
      color: 'var(--text)',
      margin: 0
    }
  }, "Roadmap")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      paddingLeft: 4
    }
  }, ROADMAP.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 14,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 34,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      flex: 'none',
      background: i === 0 ? 'var(--primary)' : 'var(--surface-2)',
      border: '1px solid ' + (i === 0 ? 'var(--primary)' : 'var(--border-strong)'),
      color: i === 0 ? 'var(--on-primary)' : 'var(--text)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 13,
      boxShadow: i === 0 ? 'var(--glow-primary)' : 'none',
      zIndex: 1
    }
  }, i + 1), i < ROADMAP.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 2,
      flex: 1,
      background: 'var(--border)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: i < ROADMAP.length - 1 ? 22 : 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--highlight)'
    }
  }, s.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text)',
      margin: '1px 0 2px'
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      color: 'var(--text-faint)',
      lineHeight: 1.4
    }
  }, s.sub))))), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 21,
      fontWeight: 600,
      color: 'var(--text)',
      margin: '8px 0 12px'
    }
  }, "Route map"), /*#__PURE__*/React.createElement(YandexMap, null), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      bottom: 0,
      background: 'linear-gradient(180deg, rgba(20,32,20,0) 0%, var(--surface) 30%)',
      padding: '16px 20px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: 'var(--text-faint)'
    }
  }, "per person"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--text)'
    }
  }, "18 500 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-dim)'
    }
  }, "\u058F"))), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    icon: "arrowRight",
    style: {
      flex: 1
    }
  }, "Book this tour")));
}
function YandexMap() {
  // Stylized dark map with route + markers (Yandex-style placeholder)
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 180,
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: '#0f1a0f'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: "0 0 340 180",
    preserveAspectRatio: "xMidYMid slice",
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("rect", {
    width: "340",
    height: "180",
    fill: "#101c10"
  }), [30, 70, 110, 150].map(y => /*#__PURE__*/React.createElement("line", {
    key: 'h' + y,
    x1: "0",
    y1: y,
    x2: "340",
    y2: y,
    stroke: "#1b2a1b",
    strokeWidth: "1"
  })), [60, 130, 200, 270].map(x => /*#__PURE__*/React.createElement("line", {
    key: 'v' + x,
    x1: x,
    y1: "0",
    x2: x,
    y2: "180",
    stroke: "#1b2a1b",
    strokeWidth: "1"
  })), /*#__PURE__*/React.createElement("path", {
    d: "M-10 40 Q 90 70 140 50 T 360 90",
    stroke: "#15331f",
    strokeWidth: "7",
    fill: "none",
    opacity: "0.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M40 150 L 110 120 L 175 95 L 250 60 L 300 35",
    stroke: "var(--primary)",
    strokeWidth: "3",
    fill: "none",
    strokeDasharray: "2 7",
    strokeLinecap: "round"
  })), [[40, 150, '1'], [175, 95, '3'], [300, 35, '5']].map(([x, y, n]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      position: 'absolute',
      left: x / 340 * 100 + '%',
      top: y / 180 * 100 + '%',
      transform: 'translate(-50%,-100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50% 50% 50% 0',
      transform: 'rotate(-45deg)',
      background: 'var(--primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--glow-primary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      transform: 'rotate(45deg)',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 11,
      color: 'var(--on-primary)'
    }
  }, n)))), /*#__PURE__*/React.createElement("div", {
    className: "hb-glass",
    style: {
      position: 'absolute',
      bottom: 8,
      right: 8,
      padding: '4px 8px',
      borderRadius: 8,
      fontFamily: 'var(--font-body)',
      fontSize: 9,
      fontWeight: 600,
      color: 'var(--text-dim)',
      letterSpacing: '0.5px'
    }
  }, "YANDEX MAPS"));
}

/* ===================== BOOKING ===================== */
function BookingScreen() {
  const [seats, setSeats] = React.useState(2);
  const price = 18500;
  return /*#__PURE__*/React.createElement("div", {
    className: "hb-scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '6px 20px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hb-iconbtn"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronLeft",
    size: 20,
    color: "var(--text)"
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      fontWeight: 600,
      color: 'var(--text)',
      margin: 0
    }
  }, "Reserve your seat")), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 20px 22px'
    },
    className: "hb-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      padding: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 56,
      height: 56,
      borderRadius: 10,
      overflow: 'hidden',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: 0,
    glow: false
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--text)',
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, "Monasteries of the Cliffs"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-dim)',
      marginTop: 3,
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 12,
    color: "var(--highlight)"
  }), "Sat, Jun 20 \xB7 08:00")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Full name"
  }, /*#__PURE__*/React.createElement("input", {
    className: "hb-input",
    defaultValue: "Areg Petrosyan"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Phone number"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      color: 'var(--text-dim)',
      padding: '0 12px 0 14px',
      borderRight: '1px solid var(--border)'
    }
  }, "+374"), /*#__PURE__*/React.createElement("input", {
    className: "hb-input",
    style: {
      border: 'none',
      paddingLeft: 12
    },
    defaultValue: "91 23 45 67"
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Number of seats"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-dim)'
    }
  }, "Travellers"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "hb-counter",
    onClick: () => setSeats(s => Math.max(1, s - 1))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "minus",
    size: 18,
    color: "var(--text)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 20,
      fontWeight: 700,
      color: 'var(--text)',
      minWidth: 22,
      textAlign: 'center'
    }
  }, seats), /*#__PURE__*/React.createElement("button", {
    className: "hb-counter hb-counter-on",
    onClick: () => setSeats(s => Math.min(18, s + 1))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 18,
    color: "var(--on-primary)"
  }))))), /*#__PURE__*/React.createElement(Field, {
    label: "Language of guide"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, ['Հայերեն', 'Русский', 'English'].map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: l,
    className: 'hb-seg' + (i === 2 ? ' hb-seg-on' : ''),
    style: {
      flex: 1
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      bottom: 0,
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '14px 20px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--text-dim)'
    }
  }, seats, " \xD7 18 500 \u058F"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--primary)'
    }
  }, (price * seats).toLocaleString('ru-RU'), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13
    }
  }, "\u058F"))), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    full: true,
    icon: "check"
  }, "Confirm booking")));
}
function Field({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text-dim)',
      marginBottom: 8,
      letterSpacing: '0.2px'
    }
  }, label), children);
}

/* ===================== MY TOURS ===================== */
const MY_TOURS = [{
  name: 'Monasteries of the Cliffs',
  date: 'Jun 20, 2026',
  seats: 2,
  status: 'confirmed',
  variant: 0
}, {
  name: 'Lake Sevan & Sevanavank',
  date: 'Jun 26, 2026',
  seats: 1,
  status: 'pending',
  variant: 1
}, {
  name: 'Tbilisi Old Town',
  date: 'Jul 9, 2026',
  seats: 3,
  status: 'paid',
  variant: 2
}, {
  name: 'Dilijan Forest Trails',
  date: 'May 2, 2026',
  seats: 2,
  status: 'cancelled',
  variant: 3
}];
function MyToursScreen() {
  const [tab, setTab] = React.useState('upcoming');
  return /*#__PURE__*/React.createElement("div", {
    className: "hb-scroll",
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 30,
      fontWeight: 600,
      color: 'var(--text)',
      margin: '0 0 16px'
    }
  }, "My Tours"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 18
    }
  }, [['upcoming', 'Upcoming'], ['past', 'Past']].map(([k, l]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    onClick: () => setTab(k),
    className: 'hb-seg' + (tab === k ? ' hb-seg-on' : ''),
    style: {
      flex: 'none',
      padding: '8px 18px'
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: '0 20px 12px'
    }
  }, MY_TOURS.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "hb-card",
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 64,
      height: 64,
      borderRadius: 11,
      overflow: 'hidden',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: t.variant,
    glow: false
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--text)',
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, t.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 6,
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      fontFamily: 'var(--font-body)',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 12,
    color: "var(--text-faint)"
  }), t.date), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      fontFamily: 'var(--font-body)',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 12,
    color: "var(--text-faint)"
  }), t.seats)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 12,
      paddingTop: 12,
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(StatusBadge, {
    status: t.status
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      fontWeight: 600,
      color: 'var(--primary)'
    }
  }, "Details ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRightSm",
    size: 14,
    color: "var(--primary)"
  })))))));
}

/* ===================== PROFILE ===================== */
function ProfileScreen() {
  const [lang, setLang] = React.useState('en');
  return /*#__PURE__*/React.createElement("div", {
    className: "hb-scroll",
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 84,
      height: 84,
      borderRadius: '50%',
      background: 'var(--surface-2)',
      border: '2px solid var(--primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--glow-primary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 34,
      fontWeight: 600,
      color: 'var(--primary)'
    }
  }, "AP")), /*#__PURE__*/React.createElement("div", {
    className: "hb-iconbtn",
    style: {
      position: 'absolute',
      bottom: -2,
      right: -2,
      width: 28,
      height: 28,
      background: 'var(--surface-2)',
      border: '1px solid var(--border-strong)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 13,
    color: "var(--text-dim)"
  }))), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      fontWeight: 600,
      color: 'var(--text)',
      margin: '12px 0 2px',
      whiteSpace: 'nowrap'
    }
  }, "Areg Petrosyan"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--text-dim)'
    }
  }, "areg.p@gmail.com")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: '20px 20px 0'
    }
  }, [['12', 'Tours'], ['3', 'Countries'], ['4.9', 'Rating']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      flex: 1
    },
    className: "hb-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 8px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--primary)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--text-dim)',
      marginTop: 2
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text-faint)',
      letterSpacing: '1px',
      marginBottom: 10
    }
  }, "LANGUAGE"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, [['hy', 'Հայերեն'], ['ru', 'Русский'], ['en', 'English']].map(([k, l]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    onClick: () => setLang(k),
    className: 'hb-seg' + (lang === k ? ' hb-seg-on' : ''),
    style: {
      flex: 1
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text-faint)',
      letterSpacing: '1px',
      marginBottom: 10
    }
  }, "NEED HELP?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "hb-contact",
    style: {
      borderColor: 'rgba(50,204,50,0.4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      borderRadius: 8,
      background: 'rgba(50,204,50,0.14)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 16,
    color: "var(--success)"
  })), "WhatsApp"), /*#__PURE__*/React.createElement("button", {
    className: "hb-contact",
    style: {
      borderColor: 'rgba(192,255,2,0.4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      borderRadius: 8,
      background: 'rgba(192,255,2,0.14)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 15,
    color: "var(--highlight)"
  })), "Telegram"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 20px 12px'
    }
  }, [['ticket', 'My bookings'], ['heart', 'Saved tours'], ['shield', 'Privacy & security']].map(([ic, l], i, a) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '15px 4px',
      borderBottom: i < a.length - 1 ? '1px solid var(--border)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 19,
    color: "var(--text-dim)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-body)',
      fontSize: 14.5,
      fontWeight: 500,
      color: 'var(--text)'
    }
  }, l), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRightSm",
    size: 17,
    color: "var(--text-faint)"
  })))));
}

/* ===================== BOTTOM NAV ===================== */
function BottomNav({
  active
}) {
  const items = [['home', 'Home'], ['search', 'Search'], ['ticket', 'My Tours'], ['user', 'Profile']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '10px 8px 22px',
      borderTop: '1px solid var(--border)',
      background: 'rgba(13,26,13,0.92)',
      backdropFilter: 'blur(12px)',
      flex: 'none'
    }
  }, items.map(([ic, l]) => {
    const on = l === active;
    return /*#__PURE__*/React.createElement("div", {
      key: l,
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 23,
      color: on ? 'var(--primary)' : 'var(--text-faint)',
      fill: on ? 'rgba(255,226,11,0.16)' : 'none',
      stroke: on ? 2.2 : 2
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 10,
        fontWeight: on ? 700 : 500,
        color: on ? 'var(--primary)' : 'var(--text-faint)'
      }
    }, l));
  }));
}
Object.assign(window, {
  HomeScreen,
  DetailScreen,
  BookingScreen,
  MyToursScreen,
  ProfileScreen,
  BottomNav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile-app/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile-app/ui.jsx
try { (() => {
/* Hayasa Tours — shared UI primitives. Exported to window for sibling babel scripts. */

/* ---------- Icons (Lucide path data, inline) ---------- */
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
  chevronRight: ['M9 18l6-6-6-6'],
  plus: ['M12 5v14', 'M5 12h14'],
  minus: ['M5 12h14'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M2 12h20', 'M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z'],
  phone: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z'],
  send: ['M22 2 11 13', 'M22 2 15 22l-4-9-9-4z'],
  star: ['M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.55 6.09 20.66l1.13-6.57L2.45 9.44l6.6-.96z'],
  arrowRight: ['M5 12h14', 'M12 5l7 7-7 7'],
  check: ['M20 6 9 17l-5-5'],
  route: ['M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M18 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M9 19h6a3 3 0 0 0 3-3v-1'],
  x: ['M18 6 6 18', 'M6 6l12 12'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.5-4 1-5.5.5 2.5 2 3.5 3 4.5 1.5 1.5 2 3 2 5a5 5 0 1 1-10 0c0-.5.04-1 .5-1.5z'],
  edit: ['M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7', 'M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z'],
  bell: ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9z', 'M10.3 21a1.94 1.94 0 0 0 3.4 0'],
  heart: ['M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 12 5 5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7z'],
  shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
  chevronRightSm: ['M9 18l6-6-6-6']
};
function Icon({
  name,
  size = 22,
  color = 'currentColor',
  stroke = 2,
  fill = 'none',
  style
}) {
  const paths = ICON_PATHS[name] || [];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: style
  }, paths.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d
  })));
}

/* ---------- Scenery: premium CSS mountain-landscape placeholder ---------- */
/* Evokes Armenian highlands at dusk; never a broken image. variant 0..3 */
const SCENERY_VARIANTS = [{
  sky: 'radial-gradient(120% 90% at 70% 100%, #2b3a14 0%, #16240f 38%, #0d1a0d 72%)',
  ridges: ['polygon(0 78%,18% 60%,34% 72%,52% 52%,70% 66%,86% 48%,100% 62%,100% 100%,0 100%)', 'polygon(0 90%,22% 76%,44% 86%,64% 72%,82% 84%,100% 74%,100% 100%,0 100%)']
}, {
  sky: 'radial-gradient(120% 90% at 30% 100%, #34400f 0%, #1a2710 40%, #0d1a0d 74%)',
  ridges: ['polygon(0 66%,20% 78%,40% 58%,58% 70%,78% 54%,100% 70%,100% 100%,0 100%)', 'polygon(0 84%,26% 70%,48% 82%,70% 68%,88% 80%,100% 72%,100% 100%,0 100%)']
}, {
  sky: 'radial-gradient(130% 100% at 50% 110%, #3a3a0e 0%, #20280f 42%, #0d1a0d 76%)',
  ridges: ['polygon(0 72%,16% 56%,38% 70%,56% 50%,74% 64%,90% 52%,100% 60%,100% 100%,0 100%)', 'polygon(0 88%,24% 74%,46% 84%,66% 70%,84% 82%,100% 76%,100% 100%,0 100%)']
}, {
  sky: 'radial-gradient(120% 90% at 60% 100%, #2e3a16 0%, #182410 40%, #0d1a0d 72%)',
  ridges: ['polygon(0 70%,22% 60%,42% 74%,60% 56%,80% 68%,100% 54%,100% 100%,0 100%)', 'polygon(0 86%,20% 78%,44% 86%,68% 74%,86% 84%,100% 76%,100% 100%,0 100%)']
}];
function Scenery({
  variant = 0,
  glow = true,
  children,
  style
}) {
  const v = SCENERY_VARIANTS[variant % SCENERY_VARIANTS.length];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      background: v.sky,
      ...style
    }
  }, glow && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      bottom: '24%',
      width: 180,
      height: 180,
      transform: 'translateX(-50%)',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,226,11,0.18) 0%, rgba(255,226,11,0) 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: '#1b2a16',
      clipPath: v.ridges[0],
      opacity: 0.85
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: '#0f1b0c',
      clipPath: v.ridges[1]
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.05,
      backgroundImage: 'repeating-linear-gradient(115deg, #C0FF02 0 1px, transparent 1px 22px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(13,26,13,0.35) 0%, rgba(13,26,13,0) 30%, rgba(13,26,13,0.55) 100%)'
    }
  }), children);
}

/* ---------- Countdown ---------- */
function useCountdown(target) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  let diff = Math.max(0, Math.floor((target - now) / 1000));
  const d = Math.floor(diff / 86400);
  diff -= d * 86400;
  const h = Math.floor(diff / 3600);
  diff -= h * 3600;
  const m = Math.floor(diff / 60);
  const s = diff - m * 60;
  const pad = n => String(n).padStart(2, '0');
  return {
    d: pad(d),
    h: pad(h),
    m: pad(m),
    s: pad(s)
  };
}
function Countdown({
  target,
  size = 'lg'
}) {
  const t = useCountdown(target);
  const big = size === 'lg';
  const units = [[t.d, 'DAYS'], [t.h, 'HRS'], [t.m, 'MIN'], [t.s, 'SEC']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: big ? 10 : 6,
      alignItems: 'flex-start'
    }
  }, units.map(([val, label], i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: label
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      color: 'var(--primary)',
      fontSize: big ? 30 : 17,
      lineHeight: 1,
      letterSpacing: '-0.5px',
      textShadow: big ? '0 0 18px rgba(255,226,11,0.45)' : 'none'
    }
  }, val), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: big ? 9 : 8,
      fontWeight: 600,
      letterSpacing: '1.5px',
      color: 'var(--text-faint)'
    }
  }, label)), i < 3 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      color: 'rgba(255,226,11,0.4)',
      fontSize: big ? 26 : 15,
      lineHeight: 1,
      marginTop: big ? 1 : 0
    }
  }, ":"))));
}

/* ---------- StatusBadge: pill with colored dot ---------- */
const STATUS = {
  pending: {
    color: '#FFE20B',
    label: 'Pending'
  },
  confirmed: {
    color: '#32CC32',
    label: 'Confirmed'
  },
  paid: {
    color: '#C0FF02',
    label: 'Paid'
  },
  cancelled: {
    color: '#FF5A5A',
    label: 'Cancelled'
  }
};
function StatusBadge({
  status
}) {
  const s = STATUS[status] || STATUS.pending;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px 4px 8px',
      borderRadius: 999,
      background: 'color-mix(in srgb, ' + s.color + ' 12%, transparent)',
      border: '1px solid color-mix(in srgb, ' + s.color + ' 35%, transparent)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: s.color,
      boxShadow: '0 0 8px ' + s.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11.5,
      fontWeight: 600,
      color: s.color,
      letterSpacing: '0.2px'
    }
  }, s.label));
}

/* ---------- Button ---------- */
function Btn({
  children,
  variant = 'primary',
  icon,
  full,
  onClick,
  style
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    border: 'none',
    borderRadius: 12,
    padding: '14px 20px',
    width: full ? '100%' : 'auto',
    transition: 'transform .12s ease, background .15s ease',
    userSelect: 'none',
    ...style
  };
  const variants = {
    primary: {
      background: 'var(--primary)',
      color: 'var(--on-primary)',
      boxShadow: 'var(--glow-primary)'
    },
    secondary: {
      background: 'var(--surface-2)',
      color: 'var(--text)',
      border: '1px solid var(--border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text)',
      border: '1px solid var(--border)'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    className: "hb-btn",
    style: {
      ...base,
      ...variants[variant]
    },
    onClick: onClick
  }, children, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18,
    color: variant === 'primary' ? 'var(--on-primary)' : 'currentColor'
  }));
}

/* ---------- StatusBar (iOS-style, for realism) ---------- */
function StatusBar() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 26px 0 30px',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--text)'
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "11",
    viewBox: "0 0 17 11",
    fill: "var(--text)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "6",
    width: "3",
    height: "5",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.5",
    y: "4",
    width: "3",
    height: "7",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2",
    width: "3",
    height: "9",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.5",
    y: "0",
    width: "3",
    height: "11",
    rx: "1"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "11",
    viewBox: "0 0 22 11",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "1",
    width: "17",
    height: "9",
    rx: "2.5",
    stroke: "var(--text)",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2.5",
    y: "2.5",
    width: "12",
    height: "6",
    rx: "1.5",
    fill: "var(--text)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "19.5",
    y: "3.5",
    width: "1.5",
    height: "4",
    rx: "0.75",
    fill: "var(--text)",
    opacity: "0.5"
  }))));
}
Object.assign(window, {
  Icon,
  Scenery,
  Countdown,
  useCountdown,
  StatusBadge,
  Btn,
  StatusBar,
  STATUS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile-app/ui.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app.jsx
try { (() => {
/* Hayasa Tours — website router. */

function App() {
  const [route, setRoute] = React.useState({
    page: 'home',
    id: null
  });
  const navigate = (page, id = null) => {
    setRoute({
      page,
      id
    });
    window.scrollTo(0, 0);
  };
  let view;
  switch (route.page) {
    case 'tours':
      view = /*#__PURE__*/React.createElement(ToursPage, {
        navigate: navigate
      });
      break;
    case 'detail':
      view = /*#__PURE__*/React.createElement(TourDetailPage, {
        navigate: navigate,
        id: route.id
      });
      break;
    case 'book':
      view = /*#__PURE__*/React.createElement(BookingPage, {
        navigate: navigate,
        id: route.id
      });
      break;
    case 'my-tours':
      view = /*#__PURE__*/React.createElement(MyToursPage, {
        navigate: navigate
      });
      break;
    case 'profile':
      view = /*#__PURE__*/React.createElement(ProfilePage, {
        navigate: navigate
      });
      break;
    case 'about':
    case 'contact':
    default:
      view = /*#__PURE__*/React.createElement(HomePage, {
        navigate: navigate
      });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, view, /*#__PURE__*/React.createElement(DemoNav, {
    route: route,
    navigate: navigate
  }));
}

/* Floating page switcher — a review aid, not part of the site chrome. */
function DemoNav({
  route,
  navigate
}) {
  const [open, setOpen] = React.useState(true);
  const pages = [['home', 'Home'], ['tours', 'Tours'], ['detail', 'Detail'], ['book', 'Booking'], ['my-tours', 'My Tours'], ['profile', 'Profile']];
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-4 left-4 z-[100]"
  }, open ? /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl bg-navy/95 backdrop-blur shadow-2xl p-2 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-body text-[10px] font-bold tracking-widest text-white/40 px-2"
  }, "PAGES"), pages.map(([k, l]) => {
    const active = route.page === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => navigate(k, k === 'detail' || k === 'book' ? 'geghard' : null),
      className: `rounded-lg px-2.5 py-1.5 font-body text-xs font-bold transition-colors ${active ? 'bg-yellow text-navy' : 'text-white/70 hover:bg-white/10'}`
    }, l);
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(false),
    className: "text-white/40 hover:text-white px-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 14,
    color: "currentColor"
  }))) : /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(true),
    className: "rounded-full bg-navy text-white shadow-2xl px-4 py-2 font-body text-xs font-bold"
  }, "Pages"));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/pages.jsx
try { (() => {
/* Hayasa Tours — website pages. Composes primitives from ui.jsx. */

function Shell({
  navigate,
  page,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col bg-white"
  }, /*#__PURE__*/React.createElement(Navbar, {
    navigate: navigate,
    page: page
  }), /*#__PURE__*/React.createElement("main", {
    className: "flex-1"
  }, children), /*#__PURE__*/React.createElement(Footer, {
    navigate: navigate
  }));
}

/* ===================== HOME ===================== */
function HomePage({
  navigate
}) {
  return /*#__PURE__*/React.createElement(Shell, {
    navigate: navigate,
    page: "home"
  }, /*#__PURE__*/React.createElement("section", {
    className: "relative h-[600px] overflow-hidden"
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: 0
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0",
    style: {
      background: 'linear-gradient(90deg, rgba(26,58,92,0.55) 0%, rgba(26,58,92,0.15) 55%, transparent 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative mx-auto max-w-[1200px] px-6 h-full flex flex-col justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[620px]"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 font-body text-xs font-bold text-white tracking-wide mb-5"
  }, FLAGS, " \xA0Group & cultural tours"), /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-white font-bold leading-[1.02] text-[58px] mb-4"
  }, "Discover Armenia", /*#__PURE__*/React.createElement("br", null), "Together"), /*#__PURE__*/React.createElement("p", {
    className: "font-body text-white/90 text-lg leading-relaxed mb-7 max-w-[460px]"
  }, "Small-group journeys through ancient monasteries, mountain lakes and highland villages \u2014 guided in Armenian, Russian and English."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-start sm:items-center gap-5"
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "amber",
    size: "lg",
    icon: "arrowRight",
    onClick: () => navigate('tours')
  }, "View Tours"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-body text-[11px] font-bold tracking-widest text-white/70 mb-2"
  }, "NEXT DEPARTURE IN"), /*#__PURE__*/React.createElement(Countdown, {
    target: TOURS[0].target,
    size: "xl"
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "bg-aqua"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-[1200px] px-6 py-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-end justify-between mb-9"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-body text-xs font-bold tracking-widest text-teal mb-2"
  }, "DEPARTING SOON"), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-[38px] font-bold text-navy leading-none"
  }, "Upcoming Tours")), /*#__PURE__*/React.createElement(Btn, {
    variant: "outline",
    size: "sm",
    icon: "arrowRight",
    onClick: () => navigate('tours')
  }, "All tours")), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1"
  }, TOURS.slice(0, 3).map(t => /*#__PURE__*/React.createElement(TourCard, {
    key: t.id,
    tour: t,
    navigate: navigate
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "bg-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-[1200px] px-6 py-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-body text-xs font-bold tracking-widest text-teal mb-2"
  }, "WHY TRAVEL WITH US"), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-[38px] font-bold text-navy leading-none"
  }, "The Hayasa Difference")), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-8 md:grid-cols-3 grid-cols-1"
  }, [['users', 'Small Groups', 'Never more than 18 travellers — real conversations with your guide and the places you visit.'], ['languages', '3 Languages', 'Every tour runs in Armenian, Russian and English so everyone feels at home.'], ['award', 'Expert Guides', 'Local historians and naturalists who know the stories behind every stone.']].map(([ic, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    className: "text-center px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto mb-5 w-14 h-14 rounded-2xl bg-aqua flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 26,
    color: "#1A7A8A"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl font-bold text-navy mb-2"
  }, t), /*#__PURE__*/React.createElement("p", {
    className: "font-body text-[15px] text-muted leading-relaxed"
  }, d)))))));
}

/* ===================== TOURS ===================== */
function ToursPage({
  navigate
}) {
  const [dateF, setDateF] = React.useState('All');
  const [lang, setLang] = React.useState('all');
  return /*#__PURE__*/React.createElement(Shell, {
    navigate: navigate,
    page: "tours"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-aqua border-b border-edge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-[1200px] px-6 py-10"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-[42px] font-bold text-navy leading-none mb-2"
  }, "Explore Our Tours"), /*#__PURE__*/React.createElement("p", {
    className: "font-body text-muted"
  }, TOURS.length, " departures across Armenia & Georgia"))), /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-[1200px] px-6 py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-4 mb-9"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative max-w-md"
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute left-4 top-1/2 -translate-y-1/2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 18,
    color: "#6A8A88"
  })), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search tours, places\u2026",
    className: "w-full rounded-xl border border-edge bg-white pl-11 pr-4 py-3 font-body text-[15px] text-navy outline-none focus:border-teal"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, ['This month', 'Next month', 'All'].map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setDateF(f),
    className: `rounded-full px-4 py-2 font-body text-sm font-medium transition-colors ${dateF === f ? 'bg-navy text-white' : 'bg-white border border-edge text-navy hover:border-teal'}`
  }, f))), /*#__PURE__*/React.createElement("button", {
    className: "inline-flex items-center gap-2 rounded-full bg-white border border-edge px-4 py-2 font-body text-sm font-medium text-navy hover:border-teal"
  }, "Location", /*#__PURE__*/React.createElement(Icon, {
    name: "chevronDown",
    size: 15,
    color: "#6A8A88"
  })), /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-1 rounded-full bg-white border border-edge px-3 py-1.5"
  }, [['all', '🌐'], ['am', '🇦🇲'], ['ru', '🇷🇺'], ['en', '🇬🇧']].map(([k, f]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setLang(k),
    className: `px-1.5 text-base rounded-full transition-all ${lang === k ? 'scale-110' : 'opacity-45 hover:opacity-90'}`
  }, f))))), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1"
  }, TOURS.map(t => /*#__PURE__*/React.createElement(TourCard, {
    key: t.id,
    tour: t,
    navigate: navigate
  })))));
}

/* ===================== TOUR DETAIL ===================== */
const ROADMAP = [{
  title: 'Garni Temple',
  sub: 'The only standing Greco-Roman colonnaded temple in the former USSR, perched above the Azat gorge.'
}, {
  title: 'Symphony of Stones',
  sub: 'A short walk down the canyon to the towering hexagonal basalt columns.'
}, {
  title: 'Geghard Monastery',
  sub: 'Rock-hewn churches carved directly into the cliff — a UNESCO World Heritage site. Lunch in the village.'
}];
function TourDetailPage({
  navigate,
  id
}) {
  const tour = TOURS.find(t => t.id === id) || TOURS[0];
  return /*#__PURE__*/React.createElement(Shell, {
    navigate: navigate,
    page: "tours"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-[1200px] px-6 py-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('tours'),
    className: "inline-flex items-center gap-1.5 font-body text-sm font-medium text-muted hover:text-teal mb-6"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronLeft",
    size: 16,
    color: "currentColor"
  }), "Back to tours"), /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-[1fr_360px] grid-cols-1 gap-10 items-start"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "relative h-[360px] rounded-[14px] overflow-hidden mb-3"
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: tour.variant
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 mb-8"
  }, [tour.variant, (tour.variant + 1) % 6, (tour.variant + 2) % 6, (tour.variant + 3) % 6].map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `relative h-[72px] flex-1 rounded-lg overflow-hidden cursor-pointer ${i === 0 ? 'ring-2 ring-amber' : 'opacity-70 hover:opacity-100'}`
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: v,
    sun: false
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-aqua px-3 py-1 font-body text-xs font-bold text-teal"
  }, tour.tag), /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-1.5 font-body text-sm text-muted"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 14,
    color: "#6A8A88"
  }), tour.lang), /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-1.5 font-body text-sm text-muted"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 14,
    color: "#6A8A88"
  }), tour.seats, " seats available")), /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-[44px] font-bold text-navy leading-[1.05] mb-2"
  }, tour.name), /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-1.5 font-body text-muted mb-6"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 16,
    color: "#1A7A8A"
  }), tour.date, " \xB7 Departs 08:00 from Republic Square"), /*#__PURE__*/React.createElement("p", {
    className: "font-body text-[15px] text-navy/80 leading-[1.7] mb-10 max-w-[640px]"
  }, "A full day through the Azat valley, tracing two thousand years of Armenian history \u2014 from a Hellenistic temple to chambers carved deep into living rock. Comfortable transport, expert guide, and lunch in a mountain village included."), /*#__PURE__*/React.createElement("div", {
    className: "font-body text-xs font-bold tracking-widest text-amber mb-5"
  }, "ROUTE"), /*#__PURE__*/React.createElement("div", {
    className: "mb-10"
  }, ROADMAP.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex gap-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center w-9 flex-none"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-full bg-amber text-white flex items-center justify-center font-mono font-bold text-sm shadow-[0_4px_10px_rgba(226,104,94,0.32)] z-10"
  }, i + 1), i < ROADMAP.length - 1 && /*#__PURE__*/React.createElement("div", {
    className: "w-0.5 flex-1 my-1",
    style: {
      background: 'repeating-linear-gradient(180deg,#1A7A8A 0 6px,transparent 6px 12px)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: i < ROADMAP.length - 1 ? 'pb-7' : 'pb-1'
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl font-bold text-navy leading-tight mb-1.5"
  }, s.title), /*#__PURE__*/React.createElement("p", {
    className: "font-body text-[15px] text-muted leading-relaxed mb-3 max-w-[520px]"
  }, s.sub), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2.5"
  }, [0, 1, 2].map(p => /*#__PURE__*/React.createElement("div", {
    key: p,
    className: "relative w-20 h-14 rounded-lg overflow-hidden"
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: (tour.variant + i + p) % 6,
    sun: false
  })))))))), /*#__PURE__*/React.createElement("div", {
    className: "font-body text-xs font-bold tracking-widest text-amber mb-4"
  }, "ROUTE MAP"), /*#__PURE__*/React.createElement(WebMap, null)), /*#__PURE__*/React.createElement("aside", {
    className: "lg:sticky lg:top-[88px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-[14px] border border-edge bg-white shadow-[0_10px_30px_rgba(26,58,92,0.1)] p-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl font-bold text-navy leading-tight mb-1"
  }, tour.name), /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-1.5 font-body text-sm text-muted mb-5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 14,
    color: "#6A8A88"
  }), tour.date), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-1 mb-5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-3xl font-bold text-navy"
  }, tour.price), /*#__PURE__*/React.createElement("span", {
    className: "font-body text-muted"
  }, "\u058F / person")), /*#__PURE__*/React.createElement("div", {
    className: "font-body text-[11px] font-bold tracking-widest text-muted mb-2"
  }, "DEPARTS IN"), /*#__PURE__*/React.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement(Countdown, {
    target: tour.target,
    size: "xl"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between rounded-xl bg-aqua px-4 py-3 mb-5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-body text-sm text-muted"
  }, "Seats remaining"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-navy"
  }, tour.seats, " / 18")), /*#__PURE__*/React.createElement(Btn, {
    variant: "amber",
    size: "lg",
    full: true,
    icon: "arrowRight",
    onClick: () => navigate('book', tour.id)
  }, "Book This Tour"))))));
}
function WebMap() {
  return /*#__PURE__*/React.createElement("div", {
    className: "relative h-[300px] rounded-[14px] overflow-hidden border border-edge",
    style: {
      background: '#e9f4f1'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: "0 0 900 300",
    preserveAspectRatio: "xMidYMid slice",
    className: "absolute inset-0"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "900",
    height: "300",
    fill: "#e6f3ef"
  }), [60, 120, 180, 240].map(y => /*#__PURE__*/React.createElement("line", {
    key: 'h' + y,
    x1: "0",
    y1: y,
    x2: "900",
    y2: y,
    stroke: "#d2e8e2",
    strokeWidth: "1"
  })), [150, 300, 450, 600, 750].map(x => /*#__PURE__*/React.createElement("line", {
    key: 'v' + x,
    x1: x,
    y1: "0",
    x2: x,
    y2: "300",
    stroke: "#d2e8e2",
    strokeWidth: "1"
  })), /*#__PURE__*/React.createElement("path", {
    d: "M-20 90 Q 220 140 360 100 T 920 160",
    stroke: "#a9dcd6",
    strokeWidth: "14",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M120 250 L 320 200 L 500 150 L 680 95 L 800 60",
    stroke: "#E2685E",
    strokeWidth: "3.5",
    fill: "none",
    strokeDasharray: "2 9",
    strokeLinecap: "round"
  })), [[120, 250, '1'], [500, 150, '2'], [800, 60, '3']].map(([x, y, n]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    className: "absolute",
    style: {
      left: x / 900 * 100 + '%',
      top: y / 300 * 100 + '%',
      transform: 'translate(-50%,-100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-7 h-7 flex items-center justify-center",
    style: {
      borderRadius: '50% 50% 50% 0',
      transform: 'rotate(-45deg)',
      background: '#E2685E',
      boxShadow: '0 4px 10px rgba(226,104,94,0.4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-xs text-white",
    style: {
      transform: 'rotate(45deg)'
    }
  }, n)))), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-3 right-3 rounded-lg bg-white/85 px-2.5 py-1 font-body text-[10px] font-bold tracking-wide text-muted"
  }, "YANDEX MAPS"));
}

/* ===================== BOOKING ===================== */
function BookingPage({
  navigate,
  id
}) {
  const tour = TOURS.find(t => t.id === id) || TOURS[0];
  const [seats, setSeats] = React.useState(2);
  const unit = parseInt(tour.price.replace(/\s/g, ''), 10);
  const total = (unit * seats).toLocaleString('ru-RU');
  return /*#__PURE__*/React.createElement(Shell, {
    navigate: navigate,
    page: "tours"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-[1100px] px-6 py-10"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('detail', tour.id),
    className: "inline-flex items-center gap-1.5 font-body text-sm font-medium text-muted hover:text-teal mb-6"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronLeft",
    size: 16,
    color: "currentColor"
  }), "Back to tour"), /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-[40px] font-bold text-navy leading-none mb-8"
  }, "Request Your Booking"), /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-[1fr_380px] grid-cols-1 gap-10 items-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-2 grid-cols-1 gap-5"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "First name"
  }, /*#__PURE__*/React.createElement("input", {
    defaultValue: "Areg",
    className: "hb-in"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Last name"
  }, /*#__PURE__*/React.createElement("input", {
    defaultValue: "Petrosyan",
    className: "hb-in"
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Phone number"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center rounded-xl border border-edge bg-white focus-within:border-teal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-sm text-muted px-3.5 border-r border-edge"
  }, "+374"), /*#__PURE__*/React.createElement("input", {
    defaultValue: "91 23 45 67",
    className: "flex-1 bg-transparent px-3 py-3 font-body text-[15px] text-navy outline-none"
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Number of seats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between rounded-xl border border-edge bg-white px-4 py-2.5 max-w-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-body text-sm text-muted"
  }, "Travellers"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSeats(s => Math.max(1, s - 1)),
    className: "w-9 h-9 rounded-lg bg-teal text-white flex items-center justify-center active:scale-90 transition-transform"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "minus",
    size: 18,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-xl font-bold text-navy w-6 text-center"
  }, seats), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSeats(s => Math.min(tour.seats, s + 1)),
    className: "w-9 h-9 rounded-lg bg-teal text-white flex items-center justify-center active:scale-90 transition-transform"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 18,
    color: "#fff"
  }))))), /*#__PURE__*/React.createElement(Field, {
    label: "Notes (optional)"
  }, /*#__PURE__*/React.createElement("textarea", {
    rows: "4",
    placeholder: "Dietary needs, pickup point, questions\u2026",
    className: "hb-in resize-none"
  }))), /*#__PURE__*/React.createElement("aside", {
    className: "lg:sticky lg:top-[88px] rounded-[14px] border border-edge bg-white shadow-[0_10px_30px_rgba(26,58,92,0.1)] overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative h-[120px]"
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: tour.variant
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-xl font-bold text-navy leading-tight mb-1"
  }, tour.name), /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-1.5 font-body text-sm text-muted mb-5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 14,
    color: "#6A8A88"
  }), tour.date), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between font-body text-sm text-navy mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-muted"
  }, seats, " \xD7 ", tour.price, " \u058F"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono"
  }, total, " \u058F")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-baseline pt-3 mt-1 border-t border-edge mb-5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-body font-bold text-navy"
  }, "Total"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-2xl font-bold text-navy"
  }, total, " ", /*#__PURE__*/React.createElement("span", {
    className: "text-base text-muted"
  }, "\u058F"))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl bg-aqua px-4 py-3 mb-5 font-body text-[13px] text-muted leading-snug"
  }, "Payment is confirmed offline \u2014 no online payment required. We'll contact you to arrange the details."), /*#__PURE__*/React.createElement(Btn, {
    variant: "amber",
    size: "lg",
    full: true,
    icon: "check"
  }, "Send Request"))))));
}
function Field({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: "block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "block font-body text-sm font-bold text-navy mb-2"
  }, label), children);
}

/* ===================== MY TOURS ===================== */
const MY = [{
  id: 'geghard',
  status: 'confirmed'
}, {
  id: 'sevan',
  status: 'pending'
}, {
  id: 'tatev',
  status: 'paid'
}, {
  id: 'dilijan',
  status: 'cancelled'
}];
function MyToursPage({
  navigate
}) {
  const [tab, setTab] = React.useState('upcoming');
  return /*#__PURE__*/React.createElement(Shell, {
    navigate: navigate,
    page: "my-tours"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-aqua border-b border-edge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-[1100px] px-6 py-10"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-[42px] font-bold text-navy leading-none mb-5"
  }, "My Tours"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, [['upcoming', 'Upcoming'], ['past', 'Past']].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setTab(k),
    className: `rounded-full px-5 py-2 font-body text-sm font-bold transition-colors ${tab === k ? 'bg-navy text-white' : 'bg-white border border-edge text-navy hover:border-teal'}`
  }, l))))), /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-[1100px] px-6 py-8 grid gap-5"
  }, MY.map(({
    id,
    status
  }) => {
    const t = TOURS.find(x => x.id === id);
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      className: "flex gap-5 bg-white rounded-[14px] border border-edge overflow-hidden hover:shadow-[0_12px_30px_rgba(26,58,92,0.1)] transition-shadow"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative w-[200px] flex-none"
    }, /*#__PURE__*/React.createElement(Scenery, {
      variant: t.variant
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 py-5 pr-6 flex flex-col justify-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between gap-4 mb-2"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-display text-2xl font-bold text-navy leading-tight truncate min-w-0"
    }, t.name), /*#__PURE__*/React.createElement(StatusBadge, {
      status: status
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-5 text-muted mb-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: "inline-flex items-center gap-1.5 font-body text-sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 14,
      color: "#6A8A88"
    }), t.date), /*#__PURE__*/React.createElement("span", {
      className: "inline-flex items-center gap-1.5 font-body text-sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "pin",
      size: 14,
      color: "#6A8A88"
    }), t.loc)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement(Countdown, {
      target: t.target,
      size: "sm"
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => navigate('detail', id),
      className: "inline-flex items-center gap-1 font-body text-sm font-bold text-teal hover:gap-2 transition-all"
    }, "View details", /*#__PURE__*/React.createElement(Icon, {
      name: "chevronRight",
      size: 15,
      color: "#1A7A8A"
    })))));
  })));
}

/* ===================== PROFILE ===================== */
function ProfilePage({
  navigate
}) {
  const [lang, setLang] = React.useState('en');
  return /*#__PURE__*/React.createElement(Shell, {
    navigate: navigate,
    page: "profile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-aqua border-b border-edge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-[900px] px-6 py-12 flex items-center gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-24 h-24 rounded-full bg-white border-4 border-white shadow-[0_8px_24px_rgba(26,58,92,0.12)] flex items-center justify-center font-display text-4xl font-bold text-teal"
  }, "AP"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl font-bold text-navy leading-none mb-1.5 whitespace-nowrap"
  }, "Areg Petrosyan"), /*#__PURE__*/React.createElement("span", {
    className: "font-body text-muted"
  }, "areg.p@gmail.com")))), /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-[900px] px-6 py-10 grid gap-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-2 grid-cols-1 gap-6"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Phone number"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center rounded-xl border border-edge bg-white"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-sm text-muted px-3.5 border-r border-edge"
  }, "+374"), /*#__PURE__*/React.createElement("input", {
    defaultValue: "91 23 45 67",
    className: "flex-1 bg-transparent px-3 py-3 font-body text-[15px] text-navy outline-none"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "block font-body text-sm font-bold text-navy mb-2"
  }, "Language"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, [['hy', '🇦🇲', 'Armenian'], ['ru', '🇷🇺', 'Russian'], ['en', '🇬🇧', 'English']].map(([k, f, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setLang(k),
    className: `flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-2 py-3 font-body text-sm font-bold transition-colors ${lang === k ? 'bg-navy text-white' : 'bg-white border border-edge text-navy hover:border-teal'}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-base"
  }, f), l))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-2xl font-bold text-navy mb-4"
  }, "Booking history"), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-3"
  }, MY.map(({
    id,
    status
  }) => {
    const t = TOURS.find(x => x.id === id);
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      className: "flex items-center gap-4 bg-white rounded-xl border border-edge px-4 py-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative w-14 h-14 rounded-lg overflow-hidden flex-none"
    }, /*#__PURE__*/React.createElement(Scenery, {
      variant: t.variant,
      sun: false
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-lg font-bold text-navy leading-tight"
    }, t.name), /*#__PURE__*/React.createElement("div", {
      className: "font-body text-xs text-muted mt-0.5"
    }, t.date)), /*#__PURE__*/React.createElement(StatusBadge, {
      status: status
    }));
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-2xl font-bold text-navy mb-4"
  }, "Need help?"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "inline-flex items-center gap-2 rounded-xl px-5 py-3 font-body text-sm font-bold text-white",
    style: {
      background: '#25D366'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 16,
    color: "#fff"
  }), "WhatsApp"), /*#__PURE__*/React.createElement("button", {
    className: "inline-flex items-center gap-2 rounded-xl px-5 py-3 font-body text-sm font-bold text-white",
    style: {
      background: '#0088CC'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 15,
    color: "#fff"
  }), "Telegram"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('home'),
    className: "font-body text-sm text-muted hover:text-navy underline underline-offset-4 justify-self-start"
  }, "Sign out")));
}
Object.assign(window, {
  HomePage,
  ToursPage,
  TourDetailPage,
  BookingPage,
  MyToursPage,
  ProfilePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ui.jsx
try { (() => {
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
  languages: ['M5 8h14', 'M5 8l3 8 3-8', 'M12 16h7', 'M3 4h8', 'M7 4v4']
};
function Icon({
  name,
  size = 22,
  color = 'currentColor',
  stroke = 2,
  fill = 'none',
  className
}) {
  const paths = ICON_PATHS[name] || [];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, paths.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d
  })));
}
const FLAGS = '🇦🇲 🇷🇺 🇬🇧';

/* ---------- Scenery: light lagoon-lake landscape placeholder ---------- */
const SCENERY_VARIANTS = [{
  sky: 'linear-gradient(180deg, #e6f5f2 0%, #f3faf8 55%)',
  r: ['polygon(0 58%,18% 42%,36% 56%,54% 38%,72% 52%,90% 40%,100% 50%,100% 70%,0 70%)', 'polygon(0 70%,24% 58%,46% 68%,66% 56%,84% 66%,100% 60%,100% 100%,0 100%)'],
  near: '#b6dcd6'
}, {
  sky: 'linear-gradient(180deg, #e3f3f0 0%, #f1f9f7 55%)',
  r: ['polygon(0 50%,22% 62%,42% 46%,60% 58%,80% 44%,100% 56%,100% 70%,0 70%)', 'polygon(0 72%,26% 60%,48% 70%,70% 58%,88% 68%,100% 62%,100% 100%,0 100%)'],
  near: '#abd4ce'
}, {
  sky: 'linear-gradient(180deg, #e9f4ee 0%, #f4faf6 55%)',
  r: ['polygon(0 56%,16% 44%,38% 58%,56% 40%,74% 54%,90% 42%,100% 52%,100% 70%,0 70%)', 'polygon(0 74%,24% 62%,46% 72%,66% 60%,84% 70%,100% 64%,100% 100%,0 100%)'],
  near: '#bdded6'
}, {
  sky: 'linear-gradient(180deg, #e4f2f4 0%, #f2f9fa 55%)',
  r: ['polygon(0 54%,22% 46%,42% 60%,60% 44%,80% 56%,100% 44%,100% 70%,0 70%)', 'polygon(0 72%,20% 64%,44% 72%,68% 62%,86% 70%,100% 64%,100% 100%,0 100%)'],
  near: '#aed6d3'
}, {
  sky: 'linear-gradient(180deg, #eaf3ec 0%, #f5faf6 55%)',
  r: ['polygon(0 60%,20% 48%,40% 60%,58% 46%,78% 58%,100% 48%,100% 70%,0 70%)', 'polygon(0 74%,22% 66%,46% 74%,68% 64%,86% 72%,100% 66%,100% 100%,0 100%)'],
  near: '#b9d9d1'
}, {
  sky: 'linear-gradient(180deg, #e5f4f1 0%, #f2faf8 55%)',
  r: ['polygon(0 52%,18% 60%,40% 48%,58% 58%,78% 46%,100% 54%,100% 70%,0 70%)', 'polygon(0 72%,26% 62%,48% 70%,70% 60%,88% 68%,100% 62%,100% 100%,0 100%)'],
  near: '#a9d2cd'
}];
function Scenery({
  variant = 0,
  sun = true,
  className,
  style
}) {
  const v = SCENERY_VARIANTS[variant % SCENERY_VARIANTS.length];
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      background: v.sky,
      ...style
    }
  }, sun && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '74%',
      top: '20%',
      width: '22%',
      paddingBottom: '22%',
      transform: 'translate(-50%,-50%)',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,226,11,0.55) 0%, rgba(255,226,11,0) 68%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: '#9bc4cf',
      clipPath: v.r[0],
      opacity: 0.55
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: v.near,
      clipPath: v.r[1]
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '30%',
      background: 'linear-gradient(180deg, #7bc2c0 0%, #5bafb0 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '30%',
      opacity: 0.22,
      backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 9px)'
    }
  }));
}

/* ---------- Countdown ---------- */
function useCountdown(target) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  let diff = Math.max(0, Math.floor((target - now) / 1000));
  const d = Math.floor(diff / 86400);
  diff -= d * 86400;
  const h = Math.floor(diff / 3600);
  diff -= h * 3600;
  const m = Math.floor(diff / 60);
  const s = diff - m * 60;
  const pad = n => String(n).padStart(2, '0');
  return {
    d: pad(d),
    h: pad(h),
    m: pad(m),
    s: pad(s)
  };
}

/* size: 'xl' (hero/sidebar, yellow on navy) | 'sm' (card, amber inline) */
function Countdown({
  target,
  size = 'xl'
}) {
  const t = useCountdown(target);
  const units = [[t.d, 'DAYS'], [t.h, 'HRS'], [t.m, 'MIN'], [t.s, 'SEC']];
  if (size === 'sm') {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5"
    }, units.map(([val, label], i) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: label
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col items-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono font-bold text-amber text-[15px] leading-none"
    }, val), /*#__PURE__*/React.createElement("span", {
      className: "font-body text-[7px] font-bold tracking-wider text-muted mt-0.5"
    }, label)), i < 3 && /*#__PURE__*/React.createElement("span", {
      className: "font-mono font-bold text-amber/40 text-[13px] leading-none"
    }, ":"))));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-stretch gap-2 rounded-xl bg-navy px-4 py-3"
  }, units.map(([val, label], i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center min-w-[44px]"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-yellow text-[34px] leading-none",
    style: {
      textShadow: '0 0 16px rgba(255,226,11,0.4)'
    }
  }, val), /*#__PURE__*/React.createElement("span", {
    className: "font-body text-[9px] font-bold tracking-[0.15em] text-white/55 mt-1.5"
  }, label)), i < 3 && /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-yellow/40 text-[28px] leading-none self-start mt-0.5"
  }, ":"))));
}

/* ---------- StatusBadge (soft tints) ---------- */
const STATUS = {
  pending: {
    bg: '#FFF8E0',
    fg: '#B8860B',
    label: 'Pending'
  },
  confirmed: {
    bg: '#E0F7EE',
    fg: '#1A6B4A',
    label: 'Confirmed'
  },
  paid: {
    bg: '#E0EBF7',
    fg: '#1A3A5C',
    label: 'Paid'
  },
  cancelled: {
    bg: '#FFE8E8',
    fg: '#CC3333',
    label: 'Cancelled'
  }
};
function StatusBadge({
  status
}) {
  const s = STATUS[status] || STATUS.pending;
  return /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold font-body",
    style: {
      background: s.bg,
      color: s.fg
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 rounded-full",
    style: {
      background: s.fg
    }
  }), s.label);
}

/* ---------- Buttons ---------- */
function Btn({
  children,
  variant = 'amber',
  icon,
  full,
  onClick,
  size = 'md',
  className = ''
}) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-[15px]',
    lg: 'px-7 py-3.5 text-base'
  };
  const variants = {
    amber: 'bg-amber text-white hover:bg-amber-dark shadow-[0_6px_16px_rgba(226,104,94,0.30)]',
    teal: 'bg-teal text-white hover:bg-[#156876]',
    outline: 'bg-white text-navy border border-edge hover:border-teal hover:text-teal',
    ghost: 'bg-transparent text-navy hover:text-teal'
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: `inline-flex items-center justify-center gap-2 rounded-xl font-body font-bold transition-all active:scale-[0.97] ${sizes[size]} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`
  }, children, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18,
    color: "currentColor"
  }));
}
function LangSwitcher({
  compact
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 text-[15px]",
    title: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576 / \u0420\u0443\u0441\u0441\u043A\u0438\u0439 / English"
  }, /*#__PURE__*/React.createElement("button", {
    className: "px-1 hover:scale-110 transition-transform"
  }, "\uD83C\uDDE6\uD83C\uDDF2"), /*#__PURE__*/React.createElement("button", {
    className: "px-1 opacity-50 hover:opacity-100 transition-opacity"
  }, "\uD83C\uDDF7\uD83C\uDDFA"), /*#__PURE__*/React.createElement("button", {
    className: "px-1 opacity-50 hover:opacity-100 transition-opacity"
  }, "\uD83C\uDDEC\uD83C\uDDE7"));
}

/* ---------- Navbar ---------- */
function Navbar({
  navigate,
  page
}) {
  const [open, setOpen] = React.useState(false);
  const links = [['tours', 'Tours'], ['about', 'About'], ['contact', 'Contact']];
  return /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-edge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-[1200px] px-6 h-[68px] flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('home'),
    className: "font-display text-2xl font-bold text-navy tracking-tight whitespace-nowrap"
  }, "HAYASA ", /*#__PURE__*/React.createElement("span", {
    className: "text-teal"
  }, "TOURS")), /*#__PURE__*/React.createElement("nav", {
    className: "hidden md:flex items-center gap-8"
  }, links.map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => navigate(k === 'tours' ? 'tours' : k),
    className: `font-body text-[15px] font-medium transition-colors ${page === k ? 'text-teal' : 'text-navy hover:text-teal'}`
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:flex items-center gap-4"
  }, /*#__PURE__*/React.createElement(LangSwitcher, null), /*#__PURE__*/React.createElement(Btn, {
    variant: "amber",
    size: "sm",
    onClick: () => navigate('tours')
  }, "Book Now")), /*#__PURE__*/React.createElement("button", {
    className: "md:hidden text-navy",
    onClick: () => setOpen(o => !o)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: open ? 'x' : 'menu',
    size: 24
  }))), open && /*#__PURE__*/React.createElement("div", {
    className: "md:hidden border-t border-edge bg-white px-6 py-4 flex flex-col gap-3"
  }, links.map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => {
      setOpen(false);
      navigate(k === 'tours' ? 'tours' : k);
    },
    className: "text-left font-body text-navy font-medium py-1"
  }, l)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pt-2"
  }, /*#__PURE__*/React.createElement(LangSwitcher, null), /*#__PURE__*/React.createElement(Btn, {
    variant: "amber",
    size: "sm",
    onClick: () => {
      setOpen(false);
      navigate('tours');
    }
  }, "Book Now"))));
}

/* ---------- Footer ---------- */
function Footer({
  navigate
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "bg-navy text-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-[1200px] px-6 py-12 grid gap-8 md:grid-cols-[1.5fr_1fr_1fr] sm:grid-cols-2 grid-cols-1"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-display text-2xl font-bold mb-3"
  }, "HAYASA TOURS"), /*#__PURE__*/React.createElement("p", {
    className: "font-body text-sm text-white/60 leading-relaxed max-w-xs"
  }, "Group & cultural tours across Armenia and Georgia \u2014 in Armenian, Russian and English.")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-body text-xs font-bold tracking-widest text-white/40 mb-1"
  }, "EXPLORE"), [['tours', 'All Tours'], ['about', 'About Us'], ['contact', 'Contact']].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: l,
    onClick: () => navigate(k === 'tours' ? 'tours' : k),
    className: "text-left font-body text-sm text-white/75 hover:text-yellow transition-colors"
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-body text-xs font-bold tracking-widest text-white/40 mb-1"
  }, "GET IN TOUCH"), /*#__PURE__*/React.createElement("button", {
    className: "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-body text-sm font-bold text-white",
    style: {
      background: '#25D366'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 16,
    color: "#fff"
  }), "WhatsApp"), /*#__PURE__*/React.createElement("button", {
    className: "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-body text-sm font-bold text-white",
    style: {
      background: '#0088CC'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 15,
    color: "#fff"
  }), "Telegram"))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-[1200px] px-6 py-5 font-body text-xs text-white/40"
  }, "\xA9 2026 Hayasa Tours. Yerevan, Armenia. All rights reserved.")));
}

/* ---------- Tour data + card ---------- */
const NOW = Date.now(),
  DAY = 86400000;
const TOURS = [{
  id: 'geghard',
  name: 'Monasteries of the Cliffs',
  loc: 'Geghard · Garni',
  date: 'Jun 20, 2026',
  target: NOW + 3 * DAY + 7 * 3600000,
  seats: 4,
  price: '18 500',
  lang: 'AM · RU · EN',
  variant: 0,
  tag: 'Cultural'
}, {
  id: 'sevan',
  name: 'Lake Sevan & Sevanavank',
  loc: 'Gegharkunik',
  date: 'Jun 26, 2026',
  target: NOW + 9 * DAY + 5 * 3600000,
  seats: 6,
  price: '14 000',
  lang: 'RU · EN',
  variant: 1,
  tag: 'Classic'
}, {
  id: 'tatev',
  name: 'Tatev & the Wings',
  loc: 'Syunik · cable car',
  date: 'Jul 3, 2026',
  target: NOW + 16 * DAY,
  seats: 11,
  price: '24 000',
  lang: 'AM · EN',
  variant: 2,
  tag: 'Premium'
}, {
  id: 'dilijan',
  name: 'Dilijan Forest Trails',
  loc: 'Tavush',
  date: 'Jul 11, 2026',
  target: NOW + 24 * DAY,
  seats: 3,
  price: '16 500',
  lang: 'AM · RU',
  variant: 3,
  tag: 'Nature'
}, {
  id: 'tbilisi',
  name: 'Tbilisi Old Town',
  loc: 'Georgia · 2 days',
  date: 'Jul 18, 2026',
  target: NOW + 31 * DAY,
  seats: 8,
  price: '42 000',
  lang: 'RU · EN',
  variant: 4,
  tag: 'Cross-border'
}, {
  id: 'khor',
  name: 'Khor Virap & Ararat View',
  loc: 'Ararat plain',
  date: 'Jul 25, 2026',
  target: NOW + 38 * DAY,
  seats: 9,
  price: '12 000',
  lang: 'AM · RU · EN',
  variant: 5,
  tag: 'Classic'
}];
function TourCard({
  tour,
  navigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => navigate('detail', tour.id),
    className: "group cursor-pointer bg-white rounded-[14px] border border-edge overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(26,58,92,0.13)] hover:border-l-4 hover:border-l-amber"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative h-[180px]"
  }, /*#__PURE__*/React.createElement(Scenery, {
    variant: tour.variant
  }), /*#__PURE__*/React.createElement("span", {
    className: "absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 font-body text-[11px] font-bold text-navy"
  }, tour.tag), /*#__PURE__*/React.createElement("span", {
    className: "absolute top-3 right-3 rounded-full px-3 py-1 font-body text-[11px] font-bold text-navy",
    style: {
      background: '#FFE20B'
    }
  }, tour.seats, " seats left")), /*#__PURE__*/React.createElement("div", {
    className: "p-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 text-muted mb-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 12,
    color: "#1A7A8A"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-body text-xs font-medium"
  }, tour.loc)), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-[22px] font-bold text-navy leading-tight mb-3 group-hover:text-teal transition-colors"
  }, tour.name), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-1.5 font-body text-xs font-medium text-muted"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 13,
    color: "#6A8A88"
  }), tour.date), /*#__PURE__*/React.createElement(Countdown, {
    target: tour.target,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pt-4 border-t border-edge"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-lg font-bold text-navy"
  }, tour.price), /*#__PURE__*/React.createElement("span", {
    className: "font-body text-sm text-muted"
  }, " \u058F")), /*#__PURE__*/React.createElement(Btn, {
    variant: "amber",
    size: "sm",
    icon: "arrowRight"
  }, "View Tour"))));
}
Object.assign(window, {
  Icon,
  Scenery,
  Countdown,
  useCountdown,
  StatusBadge,
  Btn,
  LangSwitcher,
  Navbar,
  Footer,
  TourCard,
  TOURS,
  STATUS,
  FLAGS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ui.jsx", error: String((e && e.message) || e) }); }

})();
