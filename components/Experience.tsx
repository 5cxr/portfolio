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
    role: 'Stellar Pune Hackathon — 1st Place',
    company: 'VMrentals',
    dates: '2025',
    bullets: [
      'Secured 1st place among competing teams and a $500 prize for building a decentralized, blockchain-based VM rental platform.',
      'Designed and presented a functional technical solution within a 3-member team under strict time constraints.',
    ],
  },
  {
    role: 'Research Publication — IEEE Xplore',
    company: 'ESCI 2025',
    dates: '2025',
    bullets: [
      'Published a peer-reviewed paper: "Comprehensive Comparative Analysis of Food Classification Using YOLOv8n, VGG19, and InceptionV3."',
      'Compared deep learning architectures for food image classification across accuracy, computational efficiency, and performance trade-offs.',
      'DOI: 10.1109/ESCI63694.2025.10988355',
    ],
  },
];

export default function Experience() {
  const ref = useFadeIn<HTMLElement>();

  return (
    <section id="experience" ref={ref} className="fade-in-section">
      <h2 className="section-heading">achievements</h2>

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
