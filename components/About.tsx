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
            I&apos;m a Computer Engineering student who likes building things
            that actually ship. I enjoy working across the stack — figuring
            out how pieces connect, and turning ideas into tools people can
            actually use.
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
            Currently looking for internships and interesting problems where I
            can contribute, learn from sharp people, and ship actual code.
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
          <span>📍 Pune, Maharashtra</span>
          <span>🎓 Vishwakarma University · B.Tech Computer Engineering · 2023–2027</span>
          <span>📅 4th year · CGPA 8.63</span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/5cxr' },
            { label: 'LeetCode', href: 'https://leetcode.com/u/5cxr/' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/s4r7h4k' },
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
