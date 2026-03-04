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
  title: 'CAL Specification',
  description:
    'Context Assembly Language (CAL) v1.0: A non-destructive, deterministic, LLM-native query language for assembling agent context from OMS memory stores. 27 sections covering safety model, grammar, type system, streaming, compliance, and conformance levels.',
})

async function getSpecHtml(): Promise<string> {
  const specPath = path.join(process.cwd(), 'docs', 'cal-specification.md')
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
  { id: 'cal-context-assembly-language-specification-v10', label: 'CAL · Context Assembly' },
  { id: 'abstract', label: 'Abstract' },
  { id: '1-introduction', label: '1. Introduction' },
  { id: '2-the-safety-model', label: '2. Safety Model' },
  { id: '3-lexical-structure', label: '3. Lexical Structure' },
  { id: '4-grammar-ebnf', label: '4. Grammar (EBNF)' },
  { id: '5-type-system', label: '5. Type System' },
  { id: '6-oms-grain-type-integration', label: '6. Grain Type Integration' },
  { id: '7-mg-relation-vocabulary', label: '7. Relation Vocabulary' },
  { id: '8-statement-semantics', label: '8. Statement Semantics' },
  { id: '9-semantic-shortcuts', label: '9. Semantic Shortcuts' },
  { id: '10-format-system', label: '10. FORMAT System' },
  { id: '11-streaming-protocol', label: '11. Streaming Protocol' },
  { id: '12-domain-profile-querying', label: '12. Domain Profiles' },
  { id: '13-store-protocol-mapping', label: '13. Store Protocol' },
  { id: '14-response-model', label: '14. Response Model' },
  { id: '15-dual-wire-format', label: '15. Dual Wire Format' },
  { id: '16-internationalization', label: '16. Internationalization' },
  { id: '17-execution-model', label: '17. Execution Model' },
  { id: '18-capability-token-model', label: '18. Capability Tokens' },
  { id: '19-policy-integration', label: '19. Policy Integration' },
  { id: '20-threat-model', label: '20. Threat Model' },
  { id: '21-audit-trail', label: '21. Audit Trail' },
  { id: '22-error-model', label: '22. Error Model' },
  { id: '23-compliance-checks', label: '23. Compliance Checks' },
  { id: '24-conformance-levels', label: '24. Conformance Levels' },
  { id: '25-versioning-and-evolution', label: '25. Versioning' },
  { id: '26-interface-integration', label: '26. Interface Integration' },
  { id: '27-llm-system-prompt-template', label: '27. LLM Prompt Template' },
  { id: 'appendix-a-complete-ebnf-grammar', label: 'Appendix A: EBNF Grammar' },
  { id: 'appendix-b-json-schema-references', label: 'Appendix B: JSON Schema' },
  { id: 'appendix-c-error-code-registry', label: 'Appendix C: Error Codes' },
  { id: 'appendix-d-reserved-words', label: 'Appendix D: Reserved Words' },
  { id: 'appendix-e-queryable-fields-reference', label: 'Appendix E: Queryable Fields' },
  { id: 'appendix-f-version-history', label: 'Appendix F: Version History' },
]

export default async function CalSpecPage() {
  const html = await getSpecHtml()

  return (
    <div style={{ display: 'flex', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
      {/* Sidebar */}
      <aside
        aria-label="CAL specification sections"
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
          aria-label="About the Context Assembly Language"
        >
          <strong style={{ color: 'var(--fg)' }}>What is CAL?</strong> The Context Assembly Language is a non-destructive, deterministic query language for assembling agent context from OMS memory stores. CAL cannot delete data — this is enforced at the grammar level. It answers: <em>&ldquo;what should be in the agent&apos;s context window right now?&rdquo;</em>
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
