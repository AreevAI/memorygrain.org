const cards = [
  {
    title: 'Immutable by Design',
    description: 'Every grain is SHA-256 content-addressed. Once written, it cannot be altered — only superseded. Tamper evidence is built into the format.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    title: 'Portable Everywhere',
    description: 'A .mg file is a self-contained container. Store it in S3, stream it through Kafka, carry it on a drive, or push it to Git. No vendor lock-in.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    title: 'Audit-Ready',
    description: 'COSE Sign1 signatures, DID-scoped consent, and jurisdiction-aware retention. Built for GDPR, HIPAA, and SOX compliance from day one.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
]

export function EnterpriseSection() {
  return (
    <section
      aria-label="Built for enterprise"
      style={{
        padding: 'clamp(4rem, 8vw, 6rem) 0',
      }}
    >
      <div className="container-content">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Built for Enterprise
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--fg)' }}>
            Trust at every layer.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '2rem 1.5rem',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: 'var(--accent-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                  marginBottom: '1.25rem',
                }}
              >
                {card.icon}
              </div>
              <h3
                style={{
                  fontSize: '1.0625rem',
                  fontWeight: 700,
                  color: 'var(--fg)',
                  marginBottom: '0.5rem',
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--fg-secondary)',
                  lineHeight: 1.65,
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
