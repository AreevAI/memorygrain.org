import { Bot, Car, Cpu, Antenna, Activity, Building2, Check } from 'lucide-react'

const useCases = [
  {
    icon: <Bot size={28} aria-hidden="true" />,
    title: 'AI Agents',
    description:
      'Persistent, verifiable memory for LLM-powered agents. Beliefs are extracted from Events, signed by the agent, and version-controlled for full auditability.',
    features: ['Event → Belief consolidation', 'Provenance chains', 'Multi-agent sharing'],
  },
  {
    icon: <Car size={28} aria-hidden="true" />,
    title: 'Autonomous Vehicles',
    description:
      'Every sensor reading, routing decision, and incident state is an immutable grain. Bi-temporal queries reconstruct the exact decision state at any moment.',
    features: ['Lidar Observations', 'Route Belief grains', 'Incident reconstruction'],
  },
  {
    icon: <Cpu size={28} aria-hidden="true" />,
    title: 'Robotics',
    description:
      'Robots log every action as a signed Action grain. Knowledge transfers between robot units without a central server — via content-addressed grains.',
    features: ['Action audit trail', 'Cross-robot learning', 'COSE-signed actions'],
  },
  {
    icon: <Antenna size={28} aria-hidden="true" />,
    title: 'IoT Sensors',
    description:
      'From 512-byte microcontroller grains to multi-megabyte cloud aggregations. The Lightweight profile runs on battery-powered sensors with hardware SHA-256.',
    features: ['512B Lightweight profile', 'Hardware SHA-256', 'DTLS transport'],
  },
  {
    icon: <Activity size={28} aria-hidden="true" />,
    title: 'Healthcare AI',
    description:
      'PHI-tagged grains are routed to encrypted storage without deserialization. GDPR Art. 17 erasure is O(1): destroy the HKDF key, all patient data is gone.',
    features: ['PHI sensitivity bits', 'HIPAA audit trail', 'Crypto-erasure GDPR'],
  },
  {
    icon: <Building2 size={28} aria-hidden="true" />,
    title: 'Enterprise Compliance',
    description:
      'SOX, CCPA, and GDPR compliance baked into the wire format. Selective disclosure shares facts without revealing PII. Provenance chains satisfy audit requirements.',
    features: ['Selective disclosure', 'Blind index search', 'SOX audit trails'],
  },
]

export function UseCases() {
  return (
    <section
      aria-label="Use cases"
      style={{ padding: 'clamp(4rem, 8vw, 6rem) 0' }}
    >
      <div className="container-content">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Built For
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: 'var(--fg)',
              marginBottom: '0.875rem',
            }}
          >
            Every autonomous system that needs to remember
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--fg-secondary)', lineHeight: 1.7 }}>
            From milligram microcontrollers to exabyte cloud clusters, the .mg format scales without changing a byte of the wire protocol.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {useCases.map(({ icon, title, description, features }) => (
            <article
              key={title}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '1.5rem',
                transition: 'border-color 0.2s',
              }}
            >
              <div style={{ marginBottom: '0.75rem', color: 'var(--fg-secondary)' }}>{icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.5rem' }}>{title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--fg-secondary)', lineHeight: 1.65, marginBottom: '1rem' }}>{description}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: 'var(--fg-muted)' }}>
                    <Check size={12} aria-hidden="true" style={{ color: 'var(--event)', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
