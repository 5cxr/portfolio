'use client';

import { useFadeIn } from '@/hooks/useFadeIn';

interface Project {
  name: string;
  description: string;
  tags: string[];
  href: string;
}

const projects: Project[] = [
  {
    name: 'Kilo — text editor',
    description:
      'A terminal-based text editor in ~1000 lines of C with syntax highlighting, search, and undo. Followed Snaptoken\'s guide then went off-road.',
    tags: ['C', 'POSIX', 'terminal'],
    href: 'https://github.com/s4r7h4k/kilo',
  },
  {
    name: 'MiniSQL',
    description:
      'A toy relational database with B-tree indexing, a SQL parser, and basic query planning. Persists data to disk.',
    tags: ['C++', 'data structures', 'systems'],
    href: 'https://github.com/s4r7h4k/minisql',
  },
  {
    name: 'Paste.sh',
    description:
      'A minimal pastebin clone. Pastes expire, support syntax highlighting, and can be shared via short URLs. Built in a weekend.',
    tags: ['Next.js', 'TypeScript', 'Redis', 'Vercel'],
    href: 'https://github.com/s4r7h4k/paste-sh',
  },
  {
    name: 'Arxiv Digest',
    description:
      'Daily email digest of ML papers filtered by keywords, sent via GitHub Actions + SendGrid. Saves me from Arxiv doomscrolling.',
    tags: ['Python', 'GitHub Actions', 'APIs'],
    href: 'https://github.com/s4r7h4k/arxiv-digest',
  },
];

export default function Projects() {
  const ref = useFadeIn<HTMLElement>();

  return (
    <section id="projects" ref={ref} className="fade-in-section">
      <h2 className="section-heading">projects</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-caveat), cursive',
                fontSize: '1.45rem',
                color: 'var(--ink)',
                marginBottom: '0.4rem',
                marginTop: 0,
              }}
            >
              {project.name}
            </h3>
            <p
              style={{
                fontSize: '0.82rem',
                color: 'var(--muted)',
                lineHeight: 1.65,
                margin: '0 0 0.75rem',
              }}
            >
              {project.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--red)',
                marginTop: '0.75rem',
                marginBottom: 0,
              }}
            >
              view on github ↗
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
