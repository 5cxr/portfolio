'use client';

import { useEffect, useState } from 'react';
import { useFadeIn } from '@/hooks/useFadeIn';

interface DayActivity {
  date: string;
  github: number;
  leetcode: number;
}

interface Cell {
  date: string;
  github: number;
  leetcode: number;
  total: number;
}

function level(total: number) {
  if (total === 0) return 0;
  if (total <= 2) return 1;
  if (total <= 5) return 2;
  if (total <= 9) return 3;
  return 4;
}

const levelColors = [
  'var(--heat-0)',
  'var(--heat-1)',
  'var(--heat-2)',
  'var(--heat-3)',
  'var(--heat-4)',
];

function buildWeeks(contributions: DayActivity[]): (Cell | null)[][] {
  const byDate = new Map(contributions.map((d) => [d.date, d]));

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - 364);
  // back up to the preceding Sunday so weeks align
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());

  const weeks: (Cell | null)[][] = [];
  let week: (Cell | null)[] = [];
  const cursor = new Date(start);

  while (cursor <= today) {
    const dateStr = cursor.toISOString().slice(0, 10);
    const entry = byDate.get(dateStr);
    const github = entry?.github ?? 0;
    const leetcode = entry?.leetcode ?? 0;
    week.push({ date: dateStr, github, leetcode, total: github + leetcode });

    if (cursor.getUTCDay() === 6) {
      weeks.push(week);
      week = [];
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  if (week.length) weeks.push(week);

  return weeks;
}

export default function ActivityHeatmap() {
  const ref = useFadeIn<HTMLElement>();
  const [weeks, setWeeks] = useState<(Cell | null)[][] | null>(null);
  const [hovered, setHovered] = useState<Cell | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/activity')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setWeeks(buildWeeks(data.contributions ?? []));
      })
      .catch(() => {
        if (!cancelled) setWeeks(buildWeeks([]));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const displayWeeks =
    weeks ?? Array.from({ length: 53 }, () => Array(7).fill(null));

  return (
    <section ref={ref} className="fade-in-section">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${displayWeeks.length}, 1fr)`,
          gap: '2px',
          position: 'relative',
        }}
        onMouseLeave={() => setHovered(null)}
      >
        {displayWeeks.map((week, wi) => (
          <div
            key={wi}
            style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
          >
            {week.map((cell, di) => (
              <div
                key={di}
                onMouseEnter={() => cell && setHovered(cell)}
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: '2px',
                  backgroundColor: cell
                    ? levelColors[level(cell.total)]
                    : 'transparent',
                  cursor: cell ? 'pointer' : 'default',
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <p
        style={{
          fontSize: '0.8rem',
          color: 'var(--muted)',
          marginTop: '0.75rem',
          minHeight: '1.2rem',
        }}
      >
        {hovered &&
          `${hovered.date} — ${hovered.github} GitHub commit${
            hovered.github === 1 ? '' : 's'
          }, ${hovered.leetcode} LeetCode submission${
            hovered.leetcode === 1 ? '' : 's'
          }`}
      </p>
    </section>
  );
}
