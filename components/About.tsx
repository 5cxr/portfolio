'use client';

import { useFadeIn } from '@/hooks/useFadeIn';

export default function About() {
  const ref = useFadeIn<HTMLElement>();

  return (
    <section id="about" ref={ref} className="fade-in-section">
      <h2 className="section-heading">about</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
        }}
      >
        <div>
          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: 1.8,
              color: 'var(--ink)',
              maxWidth: '600px',
            }}
          >
            I&apos;m a third-year Computer Science student who gets unreasonably
            excited about systems programming, compilers, and anything that runs
            close to the metal. I like building things that are either genuinely
            useful or genuinely interesting — ideally both.
          </p>
          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: 1.8,
              color: 'var(--ink)',
              marginTop: '0.75rem',
              maxWidth: '600px',
            }}
          >
            Currently looking for summer internships where I can contribute to
            real problems, learn from sharp people, and ship actual code.
          </p>
        </div>

        {/* Meta info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            fontSize: '0.85rem',
            color: 'var(--muted)',
            borderLeft: '2px solid var(--red)',
            paddingLeft: '1rem',
            opacity: 0.9,
          }}
        >
          <span>📍 Delhi, India</span>
          <span>🎓 IIT Delhi · B.Tech CSE · 2022–2026</span>
          <span>📅 3rd year</span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/s4r7h4k' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/sarthak' },
            { label: 'Email', href: 'mailto:29sarthak@gmail.com' },
            { label: 'Resume', href: '/resume.pdf' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="ink-link"
              style={{ fontSize: '0.88rem' }}
            >
              {label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
