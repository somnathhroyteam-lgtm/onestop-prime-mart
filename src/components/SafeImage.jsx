import { useState } from 'react';

// Fallback to a lightweight inline SVG if the remote image fails.
export default function SafeImage({ src, alt, className = '', ...rest }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 text-slate-400 ${className}`} aria-label={alt}>
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
          <path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="9" cy="10" r="2" fill="currentColor" />
          <path d="M4 17l5-5 4 4 3-3 4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
}