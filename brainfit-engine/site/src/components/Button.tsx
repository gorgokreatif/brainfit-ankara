import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  external?: boolean;
}

const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const variants = {
  primary: 'text-white hover:brightness-110 active:scale-95',
  secondary: 'text-white hover:opacity-90 active:scale-95',
  outline: 'border-2 hover:bg-white/10 active:scale-95',
  ghost: 'hover:underline active:scale-95',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const variantStyles: Record<string, React.CSSProperties> = {
  primary: { backgroundColor: 'var(--primary)', color: 'white' },
  secondary: { backgroundColor: 'var(--accent)', color: 'white' },
  outline: { borderColor: 'currentColor' },
  ghost: {},
};

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  disabled = false,
  external = false,
}: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
  const style = variantStyles[variant];

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        style={style}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} style={style}>
      {children}
    </button>
  );
}
