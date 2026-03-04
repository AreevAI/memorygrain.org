import Link from 'next/link'

const navLinks = [
  { href: '/spec', label: 'Specification' },
  { href: '/blog', label: 'Blog' },
  { href: 'https://github.com/openmemoryspec/oms', label: 'GitHub', external: true },
  { href: '/about', label: 'About' },
  { href: '/llms.txt', label: 'llms.txt', plain: true },
  { href: '/sitemap.xml', label: 'Sitemap', plain: true },
]

export function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: '1px solid var(--border)',
        padding: '2.5rem 0 2rem',
        textAlign: 'center',
      }}
    >
      <div className="container-content" style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Backed by */}
        <p style={{ fontSize: '0.9375rem', color: 'var(--fg-muted)', marginBottom: '1.25rem' }}>
          Backed by{' '}
          <a
            href="https://areev.ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--fg)', fontWeight: 600, textDecoration: 'none' }}
          >
            areev.ai
          </a>
        </p>

        {/* Nav links */}
        <nav
          aria-label="Footer navigation"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.25rem 1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          {navLinks.map(({ href, label, external, plain }) => {
            if (external || plain) {
              return (
                <a
                  key={href}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--fg-secondary)',
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </a>
              )
            }
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--fg-secondary)',
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Licensing */}
        <p style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', lineHeight: 1.7, marginBottom: '0.375rem' }}>
          Specification licensed under{' '}
          <a
            href="https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--fg-muted)', textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            OWFa 1.0
          </a>
          {' \u00B7 '}
          Website{' '}
          <a
            href="https://creativecommons.org/publicdomain/zero/1.0/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--fg-muted)', textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            CC0 1.0
          </a>
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>
          OMS v1.3 · memorygrain.org
        </p>
      </div>
    </footer>
  )
}
