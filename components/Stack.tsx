'use client';

import { useFadeIn } from '@/hooks/useFadeIn';

const stack: { group: string; items: string[] }[] = [
  {
    group: 'Languages',
    items: ['C/C++', 'Python', 'JavaScript', 'SQL', 'Java', 'HTML/CSS'],
  },
  {
    group: 'Frameworks & Libraries',
    items: ['Next.js', 'Prisma', 'Tailwind CSS', 'Pandas', 'NumPy', 'Matplotlib'],
  },
  {
    group: 'Tools & Infra',
    items: ['Git', 'VS Code', 'NeoVim', 'Linux', 'SQLite'],
  },
  {
    group: 'Concepts',
    items: ['Data Structures', 'Full-stack dev'],
  },
];

export default function Stack() {
  const ref = useFadeIn<HTMLElement>();

  return (
    <section id="stack" ref={ref} className="fade-in-section">
      <h2 className="section-heading">stack</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {stack.map(({ group, items }) => (
          <div key={group}>
            <p
              style={{
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--muted)',
                marginBottom: '0.5rem',
              }}
            >
              {group}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {items.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
