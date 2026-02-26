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
  title: 'OM Specification',
  description:
    'The Open Memory Specification (OMS) v1.2: Memory Grain (.mg) Container Definition. Ten cognitive grain types (Belief, Event, State, Workflow, Action, Observation, Goal, Reasoning, Consensus, Consent), agent-builder primitives, domain profiles, and query conventions.',
})

async function getSpecHtml(): Promise<string> {
  const specPath = path.join(process.cwd(), 'docs', 'oms-specification.md')
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
  { id: 'open-memory-specification-oms', label: 'OMS · .mg Container' },
  { id: 'abstract', label: 'Abstract' },
  { id: '1-introduction', label: '1. Introduction' },
  { id: '2-conventions-and-terminology', label: '2. Conventions' },
  { id: '3-blob-layout-and-structure', label: '3. Blob Layout' },
  { id: '4-canonical-serialization', label: '4. Canonical Serialization' },
  { id: '5-content-addressing', label: '5. Content Addressing' },
  { id: '6-field-compaction', label: '6. Field Compaction' },
  { id: '7-multi-modal-content-references', label: '7. Multi-Modal Refs' },
  { id: '8-grain-types', label: '8. Grain Types' },
  { id: '9-cryptographic-signing', label: '9. Cryptographic Signing' },
  { id: '10-selective-disclosure', label: '10. Selective Disclosure' },
  { id: '11-file-format-mg-files', label: '11. File Format' },
  { id: '12-identity-and-authorization', label: '12. Identity & Auth' },
  { id: '13-sensitivity-classification', label: '13. Sensitivity' },
  { id: '14-cross-links-and-provenance', label: '14. Provenance' },
  { id: '15-temporal-modeling', label: '15. Temporal Modeling' },
  { id: '16-encoding-options', label: '16. Encoding Options' },
  { id: '17-conformance-levels', label: '17. Conformance' },
  { id: '18-device-profiles', label: '18. Device Profiles' },
  { id: '19-error-handling', label: '19. Error Handling' },
  { id: '20-security-considerations', label: '20. Security' },
  { id: '21-test-vectors', label: '21. Test Vectors' },
  { id: '22-implementation-notes', label: '22. Implementation' },
  { id: '23-grain-protection-and-invalidation-policy', label: '23. Grain Protection' },
  { id: '24-observer-type-registry', label: '24. Observer Types' },
  { id: '25-observation-mode-registry', label: '25. Observation Modes' },
  { id: '26-observation-scope-registry', label: '26. Observation Scope' },
  { id: '27-grain-type-field-specifications', label: '27. Field Specifications' },
  { id: '28-query-conventions', label: '28. Query Conventions' },
  { id: 'appendix-a-domain-profile-registry', label: 'Appendix A: Domain Profiles' },
  { id: 'appendix-b-abnf-grammar', label: 'Appendix B: ABNF Grammar' },
  { id: 'appendix-c-field-mapping-table-compact-reference', label: 'Appendix C: Field Mapping' },
  { id: 'appendix-d-compliance-mapping', label: 'Appendix D: Compliance' },
  { id: 'appendix-e-version-history', label: 'Appendix E: Version History' },
  { id: 'appendix-f-glossary', label: 'Appendix F: Glossary' },
  { id: 'appendix-g-complete-example-grain', label: 'Appendix G: Example Grain' },
]

export default async function SpecPage() {
  const html = await getSpecHtml()

  return (
    <div style={{ display: 'flex', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
      {/* Sidebar */}
      <aside
        aria-label="Specification sections"
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
        {/* Real-world intro callout */}
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
          aria-label="About the examples in this specification"
        >
          <strong style={{ color: 'var(--fg)' }}>About the examples:</strong> Throughout this specification, <strong>Raven</strong> refers to a fictional autonomous robot or AI agent (the memory <em>producer</em>), and <strong>Trident</strong> refers to the fictional fleet management platform (the memory <em>consumer and verifier</em>).
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
