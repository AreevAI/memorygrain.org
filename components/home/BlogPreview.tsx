import Link from 'next/link'
import type { PostFrontmatter } from '@/lib/blog'
import { Badge } from '@/components/ui/Badge'

const tagVariants: Record<string, 'fact' | 'episode' | 'checkpoint' | 'workflow' | 'tool' | 'observation' | 'default'> = {
  security: 'checkpoint',
  cryptography: 'checkpoint',
  signing: 'checkpoint',
  iot: 'observation',
  robotics: 'observation',
  compliance: 'workflow',
  gdpr: 'workflow',
  hipaa: 'workflow',
  portability: 'fact',
  'ai-agents': 'episode',
  'autonomous-vehicles': 'observation',
}

export function BlogPreview({ posts }: { posts: PostFrontmatter[] }) {
  return (
    <section aria-label="Latest blog posts" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0' }}>
      <div className="container-content">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <div>
            <p style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Blog</p>
            <h2 style={{ fontSize: 'clamp(1.375rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--fg)' }}>
              Deep dives with Raven & Trident
            </h2>
          </div>
          <Link href="/blog" style={{ fontSize: '0.875rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500, whiteSpace: 'nowrap' }}>
            All articles →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <article
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '1.5rem',
                  height: '100%',
                  transition: 'border-color 0.2s',
                }}
              >
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} label={tag} variant={tagVariants[tag] || 'default'} />
                  ))}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--fg)', lineHeight: 1.35, marginBottom: '0.5rem' }}>{post.title}</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--fg-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>{post.description}</p>
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
    </section>
  )
}
