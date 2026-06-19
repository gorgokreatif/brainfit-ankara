import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

export default function Container({ children, className = '', narrow = false }: Props) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-6 lg:px-8 ${narrow ? 'max-w-3xl' : 'max-w-6xl'} ${className}`}>
      {children}
    </div>
  );
}
