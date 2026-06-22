'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

// Single source of truth for admin buttons. Ports the public Btn's tactile
// feel (hover + active:scale + focus-visible ring) and unifies the padding /
// radius / colour that were hand-rolled per page. Renders a <Link> when `href`
// is set, otherwise a <button>.
type Variant = 'primary' | 'secondary' | 'destructive' | 'ghost';
type Size = 'sm' | 'md';

const BASE =
  'inline-flex items-center justify-center gap-2 font-semibold transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 disabled:pointer-events-none';

const SIZES: Record<Size, string> = {
  sm: 'rounded-lg px-3 py-1.5 text-[13px]',
  md: 'rounded-xl px-[18px] py-2.5 text-sm',
};

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-teal text-white hover:bg-teal-dark',
  secondary: 'border border-edge bg-white text-navy hover:border-teal hover:text-teal',
  destructive: 'border border-[#F1C9C3] bg-white text-amber hover:bg-[#FCEDEB]',
  ghost: 'text-navy hover:text-teal',
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  full?: boolean;
  className?: string;
  title?: string;
};

export function AdminButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled,
  full,
  className = '',
  title,
}: Props) {
  const cls = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${full ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} title={title}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} title={title}>
      {children}
    </button>
  );
}
