'use client';

import { useFadeIn } from '@/hooks/useFadeIn';

const hobbies = [
  {
    label: 'badminton',
    note: 'Weekly games with friends — competitive when it counts.',
  },
  {
    label: 'gym',
    note: 'Trying to be consistent about it, mostly succeeding.',
  },
];

export default function Hobbies() {
  const ref = useFadeIn<HTMLElement>();

  return (
    <section id="hobbies" ref={ref} className="fade-in-section">
      <h2 className="section-heading">when not coding...</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {hobbies.map(({ label, note }) => (
          <div
            key={label}
            style={{
              padding: '0.85rem 1rem',
              border: '1px solid var(--ink)',
              borderRadius: '2px',
              opacity: 0.85,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-caveat), cursive',
                fontSize: '1.2rem',
                color: 'var(--ink)',
                margin: '0 0 0.2rem',
              }}
            >
              {label}
            </p>
            <p
              style={{
                fontSize: '0.78rem',
                color: 'var(--muted)',
                margin: 0,
                lineHeight: 1.55,
              }}
            >
              {note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
