import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { Icon, type IconName } from './Icon';

type Variant = 'amber' | 'teal' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-7 py-3.5 text-base',
};

const VARIANTS: Record<Variant, string> = {
  amber: 'bg-amber text-white hover:bg-amber-dark shadow-[0_6px_16px_rgba(226,104,94,0.30)]',
  teal: 'bg-teal text-white hover:bg-teal-dark',
  outline: 'bg-white text-navy border border-edge hover:border-teal hover:text-teal',
  ghost: 'bg-transparent text-navy hover:text-teal',
};

type BtnProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  full?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

export function Btn({
  children,
  variant = 'amber',
  size = 'md',
  icon,
  full,
  className = '',
  href,
  onClick,
  type = 'button',
}: BtnProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl font-body font-bold transition-all active:scale-[0.97] ${SIZES[size]} ${VARIANTS[variant]} ${full ? 'w-full' : ''} ${className}`;
  const inner = (
    <>
      {children}
      {icon && <Icon name={icon} size={18} color="currentColor" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
