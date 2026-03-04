import type { Metadata } from 'next'
import Link from 'next/link'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import type { Root, Element } from 'hast'
import { visit } from 'unist-util-visit'

// Rehype plugin: apply overflow-x:auto directly on <pre> so code blocks scroll instead of overflowing
function rehypeCodeScroll() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'pre') {
        node.properties = node.properties ?? {}
        const existing = (node.properties.style as string) ?? ''
        node.properties.style = (existing ? existing + '; ' : '') + 'overflow-x:auto; max-width:100%;'
      }
    })
  }
}
import { getAllSlugs, getPost } from '@/lib/blog'
import { buildMetadata } from '@/lib/metadata'
import { Badge } from '@/components/ui/Badge'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { Callout } from '@/components/ui/Callout'
import { ExpandableImage } from '@/components/ui/ExpandableImage'
import { ArrowLeft } from 'lucide-react'

const tagVariants: Record<string, 'fact' | 'episode' | 'checkpoint' | 'workflow' | 'toolcall' | 'observation' | 'default'> = {
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

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  return buildMetadata({
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  })
}

const mdxComponents = { PlaceholderImage, Callout, ExpandableImage }

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [rehypePrettyCode, { themes: { dark: 'github-dark-dimmed', light: 'github-light' }, keepBackground: false }],
          rehypeCodeScroll,
          rehypeSlug,
        ],
      },
    },
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `https://memorygrain.org/blog/${post.slug}`,
    author: { '@type': 'Organization', name: 'Memory Grain' },
    publisher: { '@type': 'Organization', name: 'Memory Grain', url: 'https://memorygrain.org' },
    keywords: post.tags.join(', '),
    about: { '@type': 'Thing', name: '.mg Memory Grain Format' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
        <div className="container-content" style={{ maxWidth: 960 }}>
          {/* Back link */}
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.875rem',
              color: 'var(--fg-muted)',
              textDecoration: 'none',
              marginBottom: '2rem',
            }}
          >
            <ArrowLeft size={14} aria-hidden="true" />
            All articles
          </Link>

          {/* Header */}
          <header style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1rem' }}>
              {post.tags.map((tag) => (
                <Badge key={tag} label={tag} variant={tagVariants[tag] || 'default'} />
              ))}
            </div>
            <h1
              style={{
                fontSize: 'clamp(1.625rem, 4vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                color: 'var(--fg)',
                marginBottom: '0.875rem',
              }}
            >
              {post.title}
            </h1>
            <p style={{ fontSize: '1.0625rem', color: 'var(--fg-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              {post.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.8125rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <time dateTime={post.date}>{post.date}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          {/* Content */}
          <article className="prose">{content}</article>

          {/* Footer */}
          <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--fg-muted)', marginBottom: '1.5rem' }}>
              Read the full <Link href="/spec" style={{ color: 'var(--accent)', textDecoration: 'none' }}>specification</Link> or explore more articles on the <Link href="/blog" style={{ color: 'var(--accent)', textDecoration: 'none' }}>blog</Link>.
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}
