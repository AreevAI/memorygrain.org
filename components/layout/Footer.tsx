import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: '1px solid var(--border)',
        padding: '3rem 0 2rem',
        marginTop: '6rem',
      }}
    >
      <div className="container-content">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '0.5rem' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-header.svg" alt="Memory Grain" className="logo-light" style={{ height: 24, width: 'auto' }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-header-dark.svg" alt="Memory Grain" className="logo-dark" style={{ height: 24, width: 'auto' }} />
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--fg-muted)', lineHeight: 1.6, maxWidth: 200 }}>
              The Open Memory Specification for autonomous systems.
            </p>
          </div>

          {/* Spec */}
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              OM Specification
            </p>
            {[
              { href: '/spec#abstract', label: 'Abstract' },
              { href: '/spec#blob-layout', label: 'Blob Layout' },
              { href: '/spec#cryptographic-signing', label: 'Cryptographic Signing' },
              { href: '/spec#conformance', label: 'Conformance Levels' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--fg-secondary)', textDecoration: 'none', marginBottom: '0.375rem' }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Blog */}
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Blog
            </p>
            {[
              { href: '/blog/cose-sign', label: 'COSE Sign1 Deep Dive' },
              { href: '/blog/header-bytes', label: '9-Byte Header Explained' },
              { href: '/blog/portability', label: 'Portability & Version Control' },
              { href: '/blog/autonomous-vehicles', label: 'Autonomous Vehicles' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--fg-secondary)', textDecoration: 'none', marginBottom: '0.375rem' }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Resources */}
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Resources
            </p>
            {[
              { href: '/about', label: 'About' },
              { href: 'https://github.com/AreevAI/memorygrain.org', label: 'GitHub', external: true },
              { href: '/llms.txt', label: 'llms.txt' },
              { href: '/sitemap.xml', label: 'Sitemap' },
            ].map(({ href, label, external }) => (
              <a
                key={href}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--fg-secondary)', textDecoration: 'none', marginBottom: '0.375rem' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: 'var(--fg-muted)' }}>
            © {year} Memory Grain contributors. Specification licensed under{' '}
            <a href="https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              OWFa 1.0
            </a>
            . Website licensed under{' '}
            <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              CC0 1.0
            </a>
            .
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>
            v1.2 · Standards Track · Hosted by{' '}
            <a href="https://arivai.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              arivai.dev
            </a>
          </p>
        </div>
      </div>

    </footer>
  )
}
