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
    name: 'VMrentals',
    description:
      'Virtual machine rental platform built with a 3-member team. Worked on the middleware and web layer — wallet integration, request handling, and connecting the frontend to on-chain payment logic. Won 1st place at the Stellar Pune Hackathon.',
    tags: ['JavaScript', 'Middleware', 'Web'],
    href: 'https://github.com/yashranaway/vmrentals',
  },
  {
    name: 'Kontri',
    description:
      'Full-stack app for organizing and tracking group gift contributions — auth, room creation, contribution tracking, and equal bill splitting.',
    tags: ['Next.js', 'Prisma', 'SQLite', 'Tailwind CSS'],
    href: 'https://github.com/5cxr/kontri',
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
