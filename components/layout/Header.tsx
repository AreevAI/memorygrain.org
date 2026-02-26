'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { Github, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/spec', label: 'OM Spec' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      role="banner"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--border)',
        background: 'rgba(var(--bg-rgb, 255 255 255) / 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: 'color-mix(in srgb, var(--bg) 85%, transparent)',
      }}
    >
      <div className="container-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <Link href="/" aria-label="Memory Grain home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-tagline.svg" alt="Memory Grain" className="logo-light" style={{ height: 38, width: 'auto' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-tagline-dark.svg" alt="Memory Grain" className="logo-dark" style={{ height: 38, width: 'auto' }} />
          </Link>

          {/* Desktop nav */}
          <nav role="navigation" aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    padding: '0.375rem 0.75rem',
                    borderRadius: 6,
                    fontSize: '0.875rem',
                    fontWeight: active ? 500 : 400,
                    color: active ? 'var(--fg)' : 'var(--fg-secondary)',
                    textDecoration: 'none',
                    background: active ? 'var(--surface)' : 'transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a
              href="https://github.com/openmemoryspec/oms"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--fg-secondary)',
                textDecoration: 'none',
              }}
            >
              <Github size={16} />
            </a>
            <ThemeToggle />

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--fg-secondary)',
                cursor: 'pointer',
              }}
              className="mobile-menu-btn"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav
            role="navigation"
            aria-label="Mobile navigation"
            style={{
              borderTop: '1px solid var(--border)',
              padding: '0.75rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '0.625rem 0.75rem',
                  borderRadius: 6,
                  fontSize: '0.9375rem',
                  color: 'var(--fg)',
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .mobile-menu-btn { display: flex !important; }
          nav[aria-label="Main navigation"] { display: none !important; }
        }

      `}</style>
    </header>
  )
}
