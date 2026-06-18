type IconName =
  | 'menu' | 'x' | 'search' | 'pin' | 'clock' | 'users' | 'globe' | 'calendar'
  | 'star' | 'arrowRight' | 'chevronRight' | 'chevronDown' | 'chevronLeft'
  | 'check' | 'plus' | 'minus' | 'phone' | 'send' | 'route' | 'shield'
  | 'heart' | 'award' | 'languages';

const ICON_PATHS: Record<IconName, string[]> = {
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

export type { IconName };

export function Icon({
  name,
  size = 22,
  color = 'currentColor',
  stroke = 2,
  fill = 'none',
  className,
}: {
  name: IconName;
  size?: number;
  color?: string;
  stroke?: number;
  fill?: string;
  className?: string;
}) {
  const paths = ICON_PATHS[name] ?? [];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
