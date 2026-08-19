import { NextResponse } from 'next/server';

const GITHUB_USER = '5cxr';
const LEETCODE_USER = '5cxr';

export const revalidate = 300;

interface DayActivity {
  date: string;
  github: number;
  leetcode: number;
}

async function getGithubContributions(): Promise<Record<string, number>> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return {};
    const data = await res.json();
    const map: Record<string, number> = {};
    for (const day of data.contributions ?? []) {
      map[day.date] = day.count;
    }
    return map;
  } catch {
    return {};
  }
}

async function getLeetcodeSubmissions(): Promise<Record<string, number>> {
  const query = `
    query userProfileCalendar($username: String!, $year: Int) {
      matchedUser(username: $username) {
        userCalendar(year: $year) {
          submissionCalendar
        }
      }
    }
  `;

  const years = [new Date().getUTCFullYear(), new Date().getUTCFullYear() - 1];
  const map: Record<string, number> = {};

  for (const year of years) {
    try {
      const res = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Referer: 'https://leetcode.com',
        },
        body: JSON.stringify({
          query,
          variables: { username: LEETCODE_USER, year },
        }),
        next: { revalidate: 3600 },
      });
      if (!res.ok) continue;
      const json = await res.json();
      const calendarRaw = json?.data?.matchedUser?.userCalendar?.submissionCalendar;
      if (!calendarRaw) continue;
      const calendar: Record<string, number> = JSON.parse(calendarRaw);
      for (const [timestamp, count] of Object.entries(calendar)) {
        const date = new Date(Number(timestamp) * 1000)
          .toISOString()
          .slice(0, 10);
        map[date] = (map[date] ?? 0) + count;
      }
    } catch {
      continue;
    }
  }

  return map;
}

export async function GET() {
  const [github, leetcode] = await Promise.all([
    getGithubContributions(),
    getLeetcodeSubmissions(),
  ]);

  const dates = new Set([...Object.keys(github), ...Object.keys(leetcode)]);
  const contributions: DayActivity[] = Array.from(dates)
    .sort()
    .map((date) => ({
      date,
      github: github[date] ?? 0,
      leetcode: leetcode[date] ?? 0,
    }));

  return NextResponse.json({ contributions });
}
