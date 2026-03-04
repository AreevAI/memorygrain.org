import Link from 'next/link'

const specs = [
  {
    num: '1',
    label: 'STORE',
    title: 'Open Memory Specification',
    description: 'Defines the .mg container — content-addressed, immutable memory grains with SHA-256 hashing and COSE signing.',
    href: '/spec',
  },
  {
    num: '2',
    label: 'QUERY',
    title: 'Context Assembly Language',
    description: 'A declarative query language for non-destructive, deterministic context assembly from grain stores.',
    href: '/cal',
  },
  {
    num: '3',
    label: 'PRESENT',
    title: 'Semantic Markup Language',
    description: 'A flat, tag-based output format optimized for LLM context windows and human review.',
    href: '/sml',
  },
]

export function HowItWorks() {
  return (
    <section
      aria-label="How it works"
      style={{
        padding: 'clamp(4rem, 8vw, 6rem) 0',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container-content">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            How it works
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--fg)', marginBottom: '1rem' }}>
            Three specs, one memory.
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--fg-secondary)', lineHeight: 1.7 }}>
            OMS defines the container, CAL queries it, and SML renders it.
            Together they give any AI agent a complete, portable memory stack.
          </p>
        </div>

        {/* Spec cards with arrows */}
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', gap: 0, flexWrap: 'wrap' }}>
          {specs.map((spec, i) => (
            <div key={spec.num} style={{ display: 'flex', alignItems: 'center' }}>
              <Link
                href={spec.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '1.75rem 1.5rem',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s',
                  width: 280,
                  minHeight: 200,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      flexShrink: 0,
                    }}
                  >
                    {spec.num}
                  </span>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {spec.label}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: 'var(--fg)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {spec.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--fg-secondary)',
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  {spec.description}
                </p>
              </Link>

              {/* Arrow separator */}
              {i < specs.length - 1 && (
                <div
                  aria-hidden="true"
                  className="how-it-works-arrow"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 12px',
                    color: 'var(--fg-muted)',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
