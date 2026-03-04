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
            v1.3 · Standards Track · OWF Final
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
          <span style={{ color: 'var(--accent)' }}>
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
            maxWidth: 640,
            margin: '0 auto 3rem',
          }}
        >
          A family of three specifications that give AI agents immutable, portable,
          and verifiable memory — so they can remember, reason, and collaborate across systems.
        </p>

        {/* CTA buttons */}
        <div
          className="animate-fade-up animate-fade-up-delay-2"
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}
        >
          <Link
            href="/spec"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.75rem 1.75rem',
              borderRadius: 8,
              background: 'var(--accent)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9375rem',
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}
          >
            Read the Specification
          </Link>
          <a
            href="https://github.com/openmemoryspec/oms"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0.75rem 1.75rem',
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--fg)',
              fontWeight: 500,
              fontSize: '0.9375rem',
              textDecoration: 'none',
              transition: 'border-color 0.15s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Spec cards */}
        <div
          className="animate-fade-up animate-fade-up-delay-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
            textAlign: 'left',
          }}
        >
          {[
            {
              mono: '.mg',
              title: 'Open Memory Specification',
              description: 'The container format — immutable, content-addressed, cryptographically signed knowledge units.',
              link: 'Read OMS spec \u2192',
              href: '/spec',
            },
            {
              mono: 'RECALL',
              title: 'Context Assembly Language',
              description: 'The query language — non-destructive, deterministic context assembly from grain stores.',
              link: 'Read CAL spec \u2192',
              href: '/cal',
            },
            {
              mono: '<belief>',
              title: 'Semantic Markup Language',
              description: 'The output format — flat, tag-based markup optimized for LLM context consumption.',
              link: 'Read SML spec \u2192',
              href: '/sml',
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              style={{
                display: 'block',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '1.5rem',
                textDecoration: 'none',
                transition: 'border-color 0.15s',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                }}
              >
                {card.mono}
              </span>
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--fg)',
                  margin: '0.5rem 0',
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--fg-secondary)',
                  lineHeight: 1.6,
                  margin: '0 0 1rem',
                }}
              >
                {card.description}
              </p>
              <span
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--accent)',
                  fontWeight: 600,
                }}
              >
                {card.link}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
