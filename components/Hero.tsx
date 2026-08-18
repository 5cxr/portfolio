'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '6rem 1.5rem 4rem',
        maxWidth: '960px',
        margin: '0 auto',
      }}
    >
      <div className="hero-inner">
        {/* Left: text */}
        <div className="hero-text">
          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.85rem',
              color: 'var(--muted)',
              marginBottom: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            hi, I&apos;m
          </p>

          <div style={{ position: 'relative', display: 'inline-block' }}>
            <h1
              className="cursor-blink"
              style={{
                fontFamily: 'var(--font-caveat), cursive',
                fontSize: 'clamp(4.5rem, 12vw, 8rem)',
                lineHeight: 1.05,
                color: 'var(--ink)',
                margin: 0,
                textShadow: '2px 2px 0 rgba(0,0,0,0.04)',
                letterSpacing: '-0.01em',
              }}
            >
              Sarthak
            </h1>

            <svg
              className="squiggly-underline"
              viewBox="0 0 300 10"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,5 C15,0 30,10 45,5 C60,0 75,10 90,5 C105,0 120,10 135,5 C150,0 165,10 180,5 C195,0 210,10 225,5 C240,0 255,10 270,5 C285,0 295,8 300,5"
                fill="none"
                stroke="var(--red)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              color: 'var(--muted)',
              marginTop: '1.25rem',
              letterSpacing: '0.01em',
            }}
          >
            CS undergrad &nbsp;·&nbsp; builder &nbsp;·&nbsp; curious human
          </p>

          <p
            style={{
              fontFamily: 'var(--font-caveat), cursive',
              fontSize: '1rem',
              color: 'var(--muted)',
              marginTop: '3.5rem',
              opacity: 0.6,
            }}
          >
            scroll down ↓
          </p>
        </div>

        {/* Right: polaroid */}
        <div className="hero-photo">
          <div className="polaroid-wrap">
            <div className="polaroid">
              <div className="tape tape-left" />
              <div className="tape tape-right" />

              <div className="polaroid-photo">
                {!imgError ? (
                  <Image
                    src="/photo.jpg"
                    alt="Sarthak"
                    fill
                    style={{ objectFit: 'cover' }}
                    onError={() => setImgError(true)}
                    priority
                  />
                ) : (
                  <div className="polaroid-photo-placeholder">
                    drop your photo at<br />
                    <strong>/public/photo.jpg</strong>
                  </div>
                )}
              </div>

              <p className="polaroid-caption">corny caption</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
