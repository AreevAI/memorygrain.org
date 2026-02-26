import Link from 'next/link'

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      style={{
        padding: 'clamp(5rem, 12vw, 9rem) 0 clamp(4rem, 8vw, 7rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--accent) 6%, transparent) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-content" style={{ position: 'relative', maxWidth: 940, margin: '0 auto' }}>
        {/* Version badge */}
        <div
          className="animate-fade-up"
          style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0.375rem 0.875rem',
              borderRadius: 999,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              fontSize: '0.8125rem',
              color: 'var(--fg-secondary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--event)',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            v1.2 · Standards Track · OWF Final
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up animate-fade-up-delay-1"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '1.75rem',
            color: 'var(--fg)',
          }}
        >
          The Open Memory Specification
          <br />
          <span style={{ color: 'var(--fg-secondary)', fontWeight: 500 }}>
            for Autonomous Systems
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="animate-fade-up animate-fade-up-delay-2"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.1875rem)',
            color: 'var(--fg-secondary)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: 600,
            margin: '0 auto 3rem',
          }}
        >
          OMS defines the Memory Grain (.mg) — immutable, content-addressed
          knowledge units for AI agents, robots, and autonomous systems.
          Cryptographically signed. Portable anywhere.
          
        </p>

        {/* CTA buttons */}
        <div
          className="animate-fade-up animate-fade-up-delay-3"
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 0,
          }}
        >
          <Link
            href="/spec"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              background: 'var(--accent)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9375rem',
              textDecoration: 'none',
              transition: 'all 0.15s',
            }}
          >
            Read the Specification
          </Link>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--fg)',
              fontWeight: 500,
              fontSize: '0.9375rem',
              textDecoration: 'none',
              transition: 'all 0.15s',
            }}
          >
            Explore Blog
          </Link>
        </div>

      </div>
    </section>
  )
}
