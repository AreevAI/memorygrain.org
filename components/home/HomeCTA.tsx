import Link from 'next/link'

export function HomeCTA() {
  return (
    <section
      aria-label="Call to action"
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        textAlign: 'center',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container-content" style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            color: 'var(--fg)',
            marginBottom: '1rem',
          }}
        >
          Implement OMS today.
        </h2>
        <p style={{ fontSize: '1.0625rem', color: 'var(--fg-secondary)', lineHeight: 1.75, marginBottom: '2.5rem' }}>
          The Open Memory Specification is open. The .mg container definition is licensed under OWF Final. Implementations in any language are welcome — read the spec, run the test vectors, and join the standard.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
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
              padding: '0.75rem 1.75rem',
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--fg)',
              fontWeight: 500,
              fontSize: '0.9375rem',
              textDecoration: 'none',
            }}
          >
            View on GitHub
          </a>
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--fg-muted)', marginTop: '2rem', fontFamily: 'var(--font-mono)' }}>
          OMS v1.3 · .mg Container Definition · Standards Track · OWF Final
        </p>
      </div>
    </section>
  )
}
