'use client';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--grid)',
        padding: '2rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-caveat), cursive',
          fontSize: '1.1rem',
          color: 'var(--muted)',
          margin: '0 0 0.85rem',
        }}
      >
        built with graph paper and caffeine
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'GitHub', href: 'https://github.com/s4r7h4k' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/sarthak' },
          { label: 'Email', href: 'mailto:29sarthak@gmail.com' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="ink-link"
            style={{ fontSize: '0.82rem' }}
          >
            {label}
          </a>
        ))}
      </div>

      <p
        style={{
          fontSize: '0.7rem',
          color: 'var(--muted)',
          marginTop: '1.25rem',
          opacity: 0.55,
        }}
      >
        © {new Date().getFullYear()} Sarthak
      </p>
    </footer>
  );
}
