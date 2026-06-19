'use client';

import { useState } from 'react';

interface Props {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
}

export default function ImageWithFallback({ src, fallback, alt, className = '' }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
}
