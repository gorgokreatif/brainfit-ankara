import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  id?: string;
  className?: string;
  bg?: 'paper' | 'white' | 'ink' | 'primary-deep';
  py?: 'sm' | 'md' | 'lg';
}

const bgMap = {
  paper: 'bg-paper',
  white: 'bg-white',
  ink: 'bg-ink text-white',
  'primary-deep': '',
};

const pyMap = {
  sm: 'py-12',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
};

export default function Section({ children, id, className = '', bg = 'paper', py = 'md' }: Props) {
  const bgStyle = bg === 'primary-deep'
    ? { backgroundColor: 'var(--primary-deep)' }
    : undefined;

  return (
    <section
      id={id}
      className={`${bgMap[bg]} ${pyMap[py]} ${className}`}
      style={bgStyle}
    >
      {children}
    </section>
  );
}
