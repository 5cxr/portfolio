'use client';

import ThemeToggle from './ThemeToggle';

export default function Nav() {
  return (
    <nav
      className="nav-glass"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.65rem 1.5rem',
        borderBottom: '1px solid var(--grid)',
      }}
    >
      <a
        href="#"
        style={{
          fontFamily: 'var(--font-caveat), cursive',
          fontSize: '1.5rem',
          color: 'var(--ink)',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
          flexShrink: 0,
        }}
      >
        S.
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Nav links — hidden on small screens */}
        <div
          className="nav-links"
          style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}
        >
          {(['about', 'stack', 'projects', 'experience', 'hobbies'] as const).map(
            (id) => (
              <a
                key={id}
                href={`#${id}`}
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  textTransform: 'lowercase',
                  letterSpacing: '0.03em',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = 'var(--ink)')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = 'var(--muted)')
                }
              >
                {id}
              </a>
            )
          )}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
