import { Check } from 'lucide-react'

const levels = [
  {
    num: 1,
    label: 'Minimal Reader',
    target: 'Libraries, tools, verification scripts',
    color: 'var(--observation)',
    features: [
      'Deserialize and verify grain blobs',
      'Compute & verify SHA-256 content addresses',
      'Field compaction (short keys ↔ full names)',
      'All ten grain types (0x01–0x0A)',
      'Ignore unknown fields',
      'Constant-time hash comparison',
    ],
  },
  {
    num: 2,
    label: 'Full Implementation',
    target: 'Agent frameworks, edge gateways',
    color: 'var(--belief)',
    features: [
      'All Level 1 requirements',
      'Serialize (canonical MessagePack)',
      'Validate required fields per schema',
      'Pass all test vectors',
      'Multi-modal content references',
      'Store protocol (get/put/delete/list)',
      'Enforce invalidation_policy on supersession & contradiction',
      'Atomic supersede operation (distinct from raw put)',
      'Validate observer_type non-empty; emit oid/otype (v1.1)',
    ],
  },
  {
    num: 3,
    label: 'Production Store',
    target: 'Enterprise deployments, cloud platforms',
    color: 'var(--state)',
    features: [
      'All Level 2 requirements',
      'Persistent backend (filesystem, S3, DB)',
      'AES-256-GCM per-grain encryption',
      'HKDF per-user key derivation',
      'Blind-index tokens for encrypted search',
      'SPO/POS/OSP index (hexastore) or equivalent',
      'Full-text search (FTS5 or equivalent)',
      'Hash-chained audit trail',
      'Crash recovery and reconciliation',
      'Policy engine with compliance presets',
      'Partition Observation storage by observer domain (v1.1)',
    ],
  },
]

export function ConformanceLevels() {
  return (
    <section aria-label="Conformance levels" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: 'var(--surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container-content">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Conformance
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--fg)', marginBottom: '0.875rem' }}>
            Implement what you need
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--fg-secondary)', lineHeight: 1.7 }}>
            Declare your conformance level. Start minimal, add layers as requirements grow.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {levels.map(({ num, label, target, color, features }) => (
            <article
              key={num}
              aria-label={`Level ${num}: ${label}`}
              style={{
                background: 'var(--surface)',
                border: `1px solid var(--border)`,
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <div style={{ height: 3, background: color }} aria-hidden="true" />
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: '0.375rem' }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Level {num}</span>
                </div>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.25rem' }}>{label}</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--fg-muted)', marginBottom: '1.25rem' }}>{target}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.8125rem', color: 'var(--fg-secondary)', lineHeight: 1.5 }}>
                      <Check size={13} aria-hidden="true" style={{ color, flexShrink: 0, marginTop: 1 }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
