import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { buildMetadata } from '@/lib/metadata'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description:
    'Deep dives into the .mg Memory Grain Format: COSE signing, header bytes, GDPR compliance, autonomous vehicles, IoT device profiles, and portability — all illustrated with Raven and Trident examples.',
})

const tagVariants: Record<string, 'fact' | 'episode' | 'checkpoint' | 'workflow' | 'tool' | 'observation' | 'default'> = {
  security: 'checkpoint',
  cryptography: 'checkpoint',
  signing: 'checkpoint',
  iot: 'observation',
  robotics: 'observation',
  'device-profiles': 'observation',
  compliance: 'workflow',
  gdpr: 'workflow',
  hipaa: 'workflow',
  portability: 'fact',
  'ai-agents': 'episode',
  'autonomous-vehicles': 'observation',
}

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div style={{ padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
      <div className="container-content">
        <header style={{ maxWidth: 600, marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Blog
          </p>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: 'var(--fg)', marginBottom: '0.875rem' }}>
            Deep dives into the .mg format
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--fg-secondary)', lineHeight: 1.7 }}>
            Technical articles explaining the specification in depth — with real-world examples using <strong style={{ color: 'var(--fg)' }}>Raven</strong> (autonomous robot) and <strong style={{ color: 'var(--fg)' }}>Trident</strong> (fleet management platform).
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article
                aria-label={post.title}
                style={{
                  background: i === 0 ? 'var(--surface)' : 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '1.5rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '0.875rem' }}>
                  {post.tags.map((tag) => (
                    <Badge key={tag} label={tag} variant={tagVariants[tag] || 'default'} />
                  ))}
                </div>
                <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.35, marginBottom: '0.625rem', flex: 1 }}>
                  {post.title}
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--fg-secondary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  {post.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.75rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>
                  <time dateTime={post.date}>{post.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
