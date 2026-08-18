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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'GitHub', href: 'https://github.com/5cxr' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/s4r7h4k' },
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
    </footer>
  );
}
