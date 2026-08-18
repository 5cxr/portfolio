'use client';

import { useFadeIn } from '@/hooks/useFadeIn';

const hobbies = [
  {
    label: 'reading',
    note: 'Currently: Surely You\'re Joking, Mr. Feynman — again.',
  },
  {
    label: 'math puzzles',
    note: 'Project Euler, competitive programming for fun, occasional USACO nostalgia.',
  },
  {
    label: 'music',
    note: 'Mostly instrumental — lofi, jazz, and whatever Spotify decides I need at midnight.',
  },
  {
    label: 'coffee',
    note: 'South Indian filter coffee > everything. Fight me.',
  },
  {
    label: 'open source rabbit holes',
    note: 'Reading source code of tools I use. It started with curiosity, it became a problem.',
  },
  {
    label: 'writing',
    note: 'Occasional blog posts on things I figure out. Rubber duck therapy, essentially.',
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
