'use client';

import { useFadeIn } from '@/hooks/useFadeIn';

type ProjectStatus = 'Completed' | 'In Progress';

interface Project {
  name: string;
  description: string;
  tags: string[];
  href: string;
  status: ProjectStatus;
}

const projects: Project[] = [
  {
    name: 'VMrentals',
    description:
      'Virtual machine rental platform built with a 3-member team. Worked on the middleware and web layer — wallet integration, request handling, and connecting the frontend to on-chain payment logic. Won 1st place at the Stellar Pune Hackathon.',
    tags: ['JavaScript', 'Middleware', 'Web'],
    href: 'https://github.com/yashranaway/vmrentals',
    status: 'Completed',
  },
  {
    name: 'Kontri',
    description:
      'Full-stack app for organizing and tracking group gift contributions — auth, room creation, contribution tracking, and equal bill splitting.',
    tags: ['Next.js', 'Prisma', 'SQLite', 'Tailwind CSS'],
    href: 'https://github.com/5cxr/kontri',
    status: 'Completed',
  },
  {
    name: 'Blackjack',
    description:
      'Multiplayer blackjack with virtual currency — players join a shared table by room code, each gets their own hand against one dealer, turns go in sequence like a real casino table.',
    tags: ['Next.js', 'Postgres', 'Drizzle', 'Redis', 'WebSockets'],
    href: 'https://github.com/5cxr/blackjack',
    status: 'In Progress',
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem',
                marginBottom: '0.4rem',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-caveat), cursive',
                  fontSize: '1.45rem',
                  color: 'var(--ink)',
                  margin: 0,
                }}
              >
                {project.name}
              </h3>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '999px',
                  whiteSpace: 'nowrap',
                  color: project.status === 'Completed' ? 'var(--ink)' : 'var(--muted)',
                  border: `1px solid ${project.status === 'Completed' ? 'var(--ink)' : 'var(--muted)'}`,
                }}
              >
                {project.status}
              </span>
            </div>
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
              view on github
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
