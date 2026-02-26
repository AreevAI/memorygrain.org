import { Database, ScrollText, Bookmark, GitBranch, Wrench, Activity, Target, BrainCircuit, Users, ShieldCheck, type LucideIcon } from 'lucide-react'

type GrainType = {
  key: string
  label: string
  icon: LucideIcon
  byte: string
  tagline: string
  description: string
  isNew?: boolean
}

type Group = {
  label: string
  summary: string
  types: GrainType[]
}

const groups: Group[] = [
  {
    label: 'Input',
    summary: 'What comes in',
    types: [
      {
        key: 'observation',
        label: 'Observation',
        icon: Activity,
        byte: '0x06',
        tagline: 'What the agent perceived',
        description: '"I measured X" — distinct from Belief ("X is true"). Anchored to a specific observer, moment, and method. Covers sensor readings, LLM reflections, and human annotations.',
      },
      {
        key: 'event',
        label: 'Event',
        icon: ScrollText,
        byte: '0x02',
        tagline: 'What happened',
        description: 'A raw, timestamped record of a message, interaction, or occurrence. The input to consolidation engines that extract structured Beliefs from conversation.',
      },
    ],
  },
  {
    label: 'Knowledge',
    summary: 'What the agent holds',
    types: [
      {
        key: 'belief',
        label: 'Belief',
        icon: Database,
        byte: '0x01',
        tagline: 'What the agent knows',
        description: 'A (subject, relation, object) triple with a confidence score. The canonical unit of declarative knowledge — user preferences, learned facts, diagnosed conditions.',
      },
      {
        key: 'reasoning',
        label: 'Reasoning',
        icon: BrainCircuit,
        byte: '0x08',
        tagline: 'How the agent concluded it',
        description: 'An inference chain — premises, conclusion, and method. Captures extended thinking from LLMs. Grains with requires_human_review block automated decisions until cleared.',
        isNew: true,
      },
      {
        key: 'state',
        label: 'State',
        icon: Bookmark,
        byte: '0x03',
        tagline: 'Where the agent is',
        description: 'A portable save point — the agent\'s full context at a moment in time. Load a State grain to resume or forensically replay any decision.',
      },
    ],
  },
  {
    label: 'Action',
    summary: 'What the agent does',
    types: [
      {
        key: 'action',
        label: 'Action',
        icon: Wrench,
        byte: '0x05',
        tagline: 'What the agent did',
        description: 'An immutable record of a tool call, code execution, or computer-use action — input, output, duration, and error status. The complete audit trail for every agent action.',
      },
      {
        key: 'workflow',
        label: 'Workflow',
        icon: GitBranch,
        byte: '0x04',
        tagline: 'How to do it',
        description: 'A trigger-response procedure: when a condition fires, execute these steps in order. Encodes repeatable processes that can be shared across agents.',
      },
      {
        key: 'goal',
        label: 'Goal',
        icon: Target,
        byte: '0x07',
        tagline: 'What the agent wants',
        description: 'An objective with full lifecycle semantics: active → satisfied | failed | suspended. Supports priority, deadlines, success criteria, and task delegation to sub-agents.',
      },
    ],
  },
  {
    label: 'Social',
    summary: 'Multi-agent & trust',
    types: [
      {
        key: 'consensus',
        label: 'Consensus',
        icon: Users,
        byte: '0x09',
        tagline: 'What agents agreed on',
        description: 'A multi-agent agreement record. Captures when a quorum of agents converges on a shared belief or decision, with trust-weighted confidence across the participating agents.',
        isNew: true,
      },
      {
        key: 'consent',
        label: 'Consent',
        icon: ShieldCheck,
        byte: '0x0A',
        tagline: 'What the user permitted',
        description: 'A DID-scoped, purpose-bounded permission grant or withdrawal. Revoking a Consent grain triggers cascading erasure of all grains whose processing depended on it.',
        isNew: true,
      },
    ],
  },
]

function GrainCard({ type }: { type: GrainType }) {
  const { label, icon: Icon, byte, tagline, description, isNew } = type
  return (
    <article
      aria-label={`${label} grain type`}
      style={{
        borderRadius: 10,
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--border)',
        background: 'var(--bg)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {/* Header: icon + name + tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 26,
          height: 26,
          borderRadius: 6,
          background: 'var(--elevated)',
          flexShrink: 0,
        }}>
          <Icon size={13} aria-hidden="true" style={{ color: 'var(--fg-secondary)' }} strokeWidth={2.5} />
        </span>
        <span style={{ fontWeight: 600, color: 'var(--fg-secondary)', fontSize: '0.875rem' }}>{label}</span>
        <span style={{ fontSize: '0.875rem', color: 'var(--fg)', fontWeight: 600 }}>{tagline}</span>
        {isNew && (
          <span style={{
            fontSize: '0.6rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: 'var(--accent)',
            background: 'var(--accent-light)',
            padding: '0.2em 0.5em',
            borderRadius: 4,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            flexShrink: 0,
          }}>new</span>
        )}
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.875rem', color: 'var(--fg-secondary)', lineHeight: 1.65, margin: 0 }}>
        {description}
      </p>
    </article>
  )
}

export function MemoryTypes() {
  return (
    <section aria-label="Ten grain types" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0' }}>
      <div className="container-content">

        {/* Section header */}
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Grain Types · OMS v1.2
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--fg)', marginBottom: '0.875rem' }}>
            Ten grains for every kind of knowledge
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--fg-secondary)', lineHeight: 1.7 }}>
            Each type has a required schema, a single-byte identifier, and optional fields for compliance, provenance, and multi-modal content.
          </p>
        </div>

        {/* Groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {groups.map((group, gi) => (
            <div key={group.label}>

              {/* Group header */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
                {gi > 0 && (
                  <span style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--fg-muted)',
                    marginRight: 2,
                  }}>↓</span>
                )}
                <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--fg)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {group.label}
                </h3>
                <span style={{ fontSize: '0.8125rem', color: 'var(--fg-muted)' }}>— {group.summary}</span>
              </div>

              {/* Cards */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}>
                {group.types.map((type) => (
                  <GrainCard key={type.key} type={type} />
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
