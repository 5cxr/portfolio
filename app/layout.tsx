import type { Metadata } from 'next';
import { Caveat, Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import GrainOverlay from '@/components/GrainOverlay';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sarthak Patankar — Computer Engineering Student & Builder',
  description:
    'Portfolio of Sarthak Patankar, Computer Engineering student at Vishwakarma University, full-stack & blockchain builder.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${caveat.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <GrainOverlay />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
