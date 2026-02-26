import { Cloud, Zap, HardDrive, Archive, Check } from 'lucide-react'

export function HowItWorks() {
  return (
    <section
      aria-label="How .mg works"
      style={{
        padding: 'clamp(4rem, 8vw, 6rem) 0',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container-content">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            How it works
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--fg)' }}>
            Three steps. One universal format.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, alignItems: 'start' }}>
          {/* Step 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>1</span>
              <h3 style={{ fontWeight: 600, color: 'var(--fg)', fontSize: '1.0625rem' }}>Write a grain</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--fg-secondary)', lineHeight: 1.65, marginBottom: '0.875rem' }}>
              Create any of ten grain types — Belief, Event, State, Workflow, Action, Observation, Goal, Reasoning, Consensus, or Consent — with your structured data.
            </p>
            <pre
              aria-label="Example fact grain JSON"
              style={{
                background: 'var(--code-bg)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '0.875rem 1rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--fg-secondary)',
                overflow: 'auto',
                lineHeight: 1.6,
              }}
            >{`{
  "type": "observation",
  "observer_id": "lidar-front",
  "observer_type": "lidar",
  "subject": "raven-001",
  "object": "obstacle:3.2m",
  "confidence": 0.97,
  "namespace": "autonomy"
}`}</pre>
          </div>

          {/* Step 2 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: 'var(--state)', color: '#fff', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>2</span>
              <h3 style={{ fontWeight: 600, color: 'var(--fg)', fontSize: '1.0625rem' }}>Serialize & hash</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--fg-secondary)', lineHeight: 1.65, marginBottom: '0.875rem' }}>
              Canonical MessagePack serialization — sorted keys, NFC strings, null omission — guarantees the same content always produces the same bytes. SHA-256 the blob.
            </p>
            <div
              style={{
                background: 'var(--code-bg)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '0.875rem 1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                lineHeight: 1.6,
              }}
            >
              <div style={{ color: 'var(--fg-muted)', marginBottom: 6 }}># Canonical blob → SHA-256</div>
              <div style={{ color: 'var(--fg-secondary)', marginBottom: 4 }}>0x01 0x00 0x06 0xE9 0x77 0x67A708C0</div>
              <div style={{ color: 'var(--fg-muted)', marginBottom: 8 }}>  ↑ver ↑flags ↑obs  ↑ns(2B)  ↑timestamp</div>
              <div style={{ color: 'var(--accent)', wordBreak: 'break-all' }}>
                4eed1d6bdfb34bfc<br />f2dd157482fc70af
              </div>
              <div style={{ color: 'var(--event)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>→ content address <Check size={12} aria-hidden="true" /></div>
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: 'var(--event)', color: '#fff', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>3</span>
              <h3 style={{ fontWeight: 600, color: 'var(--fg)', fontSize: '1.0625rem' }}>Store anywhere</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--fg-secondary)', lineHeight: 1.65, marginBottom: '0.875rem' }}>
              The .mg file is a portable container. Stream it into Kafka, store it in S3, push it to Git, or carry it on a drive. The hash proves integrity anywhere it lands.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: <Cloud size={16} aria-hidden="true" />, label: 'Cloud & On-Prem — AWS S3, GCP, Azure Blob' },
                { icon: <Zap size={16} aria-hidden="true" />, label: 'Streams & Caches — Kafka, Redis, Pulsar' },
                { icon: <HardDrive size={16} aria-hidden="true" />, label: 'Portable Drive — USB or external, air-gapped' },
                { icon: <Archive size={16} aria-hidden="true" />, label: 'Git Repository — version control · diff · rollback' },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.5rem 0.75rem' }}>
                  <span style={{ flexShrink: 0, display: 'flex', color: 'var(--fg-muted)' }}>{icon}</span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--fg-secondary)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
