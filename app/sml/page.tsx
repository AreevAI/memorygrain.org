import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'SML Specification',
  description:
    'Semantic Markup Language (SML) v1.0: A flat, tag-based markup format optimized for LLM context consumption. The default output format for CAL ASSEMBLE statements. Part of the Open Memory Specification (OMS) v1.3.',
})

async function getSpecHtml(): Promise<string> {
  const specPath = path.join(process.cwd(), 'docs', 'sml-specification.md')
  const source = fs.readFileSync(specPath, 'utf-8')

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, {
      themes: { dark: 'github-dark-dimmed', light: 'github-light' },
      keepBackground: false,
    })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(source)

  return String(result)
}

const tocSections = [
  { id: 'sml-semantic-markup-language-specification-v10', label: 'SML · Semantic Markup' },
  { id: 'abstract', label: 'Abstract' },
  { id: '1-what-is-sml', label: '1. What is SML?' },
  { id: '2-structural-rules', label: '2. Structural Rules' },
  { id: '3-comprehensive-example--all-10-grain-types', label: '3. Comprehensive Example' },
  { id: '4-progressive-disclosure', label: '4. Progressive Disclosure' },
  { id: 'appendix-a-relationship-to-cal', label: 'Appendix A: Relationship to CAL' },
]

export default async function SmlSpecPage() {
  const html = await getSpecHtml()

  return (
    <div style={{ display: 'flex', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
      {/* Sidebar */}
      <aside
        aria-label="SML specification sections"
        style={{
          display: 'none',
          width: 220,
          flexShrink: 0,
          paddingTop: '2.5rem',
          paddingRight: '2rem',
          position: 'sticky',
          top: 64,
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
        }}
        className="spec-sidebar"
      >
        <p style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-muted)', marginBottom: '0.75rem' }}>
          Contents
        </p>
        <nav role="navigation" aria-label="Table of contents">
          {tocSections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              style={{
                display: 'block',
                padding: '0.3rem 0.5rem',
                borderRadius: 4,
                fontSize: '0.8125rem',
                color: 'var(--fg-secondary)',
                textDecoration: 'none',
                lineHeight: 1.4,
                marginBottom: 2,
                transition: 'color 0.15s, background 0.15s',
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main spec content */}
      <article
        className="prose spec-article"
        style={{ flex: 1, minWidth: 0, padding: '2.5rem 0', maxWidth: '72ch' }}
      >
        {/* Intro callout */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
            fontSize: '0.9rem',
            color: 'var(--fg-secondary)',
            lineHeight: 1.65,
          }}
          role="note"
          aria-label="About the Semantic Markup Language"
        >
          <strong style={{ color: 'var(--fg)' }}>What is SML?</strong> The Semantic Markup Language is a flat, tag-based markup format optimized for LLM context consumption. Tag names map directly to OMS grain types — <code style={{ fontSize: '0.85em' }}>&lt;belief&gt;</code>, <code style={{ fontSize: '0.85em' }}>&lt;goal&gt;</code>, <code style={{ fontSize: '0.85em' }}>&lt;event&gt;</code> — so LLMs understand the epistemic status of each piece of context without parsing schemas.
        </div>

        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <style>{`
        @media (min-width: 900px) {
          .spec-sidebar { display: block !important; }
          .spec-article {
            border-left: 1px solid var(--border-subtle);
            padding-left: 2.5rem !important;
          }
        }
        .spec-sidebar a:hover {
          color: var(--accent) !important;
          background: var(--surface) !important;
        }
      `}</style>
    </div>
  )
}
