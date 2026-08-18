'use client';

import { useFadeIn } from '@/hooks/useFadeIn';

interface ExperienceEntry {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
}

const experiences: ExperienceEntry[] = [
  {
    role: 'Software Engineering Intern',
    company: 'Zeta Suite',
    dates: 'May 2024 – Jul 2024',
    bullets: [
      'Built an internal dashboard for monitoring transaction pipelines, reducing mean time-to-detect for anomalies from ~20 min to under 3 min.',
      'Migrated a legacy cron-based job scheduler to a Kafka-backed event-driven system; improved throughput by 4×.',
      'Wrote load tests with k6, surfacing a PostgreSQL connection pool bottleneck that was silently dropping 2% of requests.',
    ],
  },
  {
    role: 'Open Source Contributor',
    company: 'FOSS Club, IIT Delhi',
    dates: 'Aug 2023 – present',
    bullets: [
      'Maintain a student-run Gitea instance; handle infra, onboarding, and occasional fires at 2 AM.',
      'Contributed small fixes and docs improvements to half a dozen projects — nothing glamorous, but it ships.',
      'Ran two internal workshops on Git internals and terminal productivity tools.',
    ],
  },
];

export default function Experience() {
  const ref = useFadeIn<HTMLElement>();

  return (
    <section id="experience" ref={ref} className="fade-in-section">
      <h2 className="section-heading">experience</h2>

      <div
        style={{
          position: 'relative',
          paddingLeft: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.25rem',
        }}
      >
        {/* Vertical line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '1px',
            backgroundColor: 'var(--ink)',
            opacity: 0.2,
          }}
        />

        {experiences.map((entry) => (
          <div key={entry.role} style={{ position: 'relative' }}>
            {/* Dot */}
            <div
              style={{
                position: 'absolute',
                left: '-1.625rem',
                top: '6px',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                backgroundColor: 'var(--red)',
                border: '2px solid var(--paper)',
              }}
            />

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                gap: '0.4rem',
                marginBottom: '0.25rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-caveat), cursive',
                  fontSize: '1.3rem',
                  color: 'var(--ink)',
                }}
              >
                {entry.role}
              </span>
              <span
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--muted)',
                }}
              >
                @ {entry.company}
              </span>
            </div>

            <p
              style={{
                fontSize: '0.72rem',
                color: 'var(--muted)',
                marginBottom: '0.6rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {entry.dates}
            </p>

            <ul
              style={{
                paddingLeft: '1.1rem',
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
              }}
            >
              {entry.bullets.map((bullet, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: '0.84rem',
                    lineHeight: 1.7,
                    color: 'var(--ink)',
                    opacity: 0.85,
                  }}
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
