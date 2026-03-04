'use client'

import { useState, useEffect, useCallback, useRef, type ReactNode, Fragment } from 'react'
import { PenLine, Braces, Eye, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react'

type GrainReader = { agent: string; use: string }

type GrainCard = {
  type: string
  typeHex: string
  color: string
  agent: string
  company: string
  description: string
  hash: string
  payload: Record<string, unknown>
  readers: GrainReader[]
}

const cards: GrainCard[] = [
  {
    type: 'Belief',
    typeHex: '0x01',
    color: 'var(--belief)',
    agent: 'FitCoach',
    company: 'KineticAI',
    description:
      'Learned from three months of workout data. Nutrition and scheduling agents use this grain to personalize recovery plans.',
    hash: 'a7f3e812…9c21',
    payload: {
      type: 'belief',
      subject: 'user:john-smith',
      relation: 'preferred_activity',
      object: 'morning_run_5k',
      confidence: 0.94,
      source_type: 'pattern',
      created_at: 1739980800000,
      namespace: 'fitness:preferences',
    },
    readers: [
      { agent: 'FoodBot', use: 'meal planning' },
      { agent: 'CalendarBot', use: 'schedule optimization' },
      { agent: 'FitCoach', use: 'training progression' },
    ],
  },
  {
    type: 'Event',
    typeHex: '0x02',
    color: 'var(--event)',
    agent: 'AutoPilot',
    company: 'DrivAI',
    description:
      'Milestone logged when the vehicle completed its longest autonomous trip. Route and efficiency agents reference this for future planning.',
    hash: 'c4e9d5a1…b702',
    payload: {
      type: 'event',
      role: 'assistant',
      content:
        'Completed 320 km autonomous drive, SF to Tahoe \u2014 zero interventions, avg 92 km/h.',
      created_at: 1740000023000,
      user_id: 'john-smith',
      namespace: 'driving:milestones',
      importance: 0.9,
      structural_tags: ['milestone', 'driving'],
    },
    readers: [
      { agent: 'RouteBot', use: 'route planning' },
      { agent: 'EfficiencyAI', use: 'energy optimization' },
    ],
  },
  {
    type: 'Observation',
    typeHex: '0x06',
    color: 'var(--observation)',
    agent: 'NestMind',
    company: 'HomeSphere',
    description:
      'Anomalous biometric reading flagged against a 30-day baseline. Triggers downstream health and wellness workflows.',
    hash: '38bf0c74…e519',
    payload: {
      type: 'observation',
      observer_id: 'ring-v3:hr-monitor',
      observer_type: 'heart_rate',
      subject: 'user:john-smith',
      object: '82 bpm (baseline 68)',
      confidence: 0.91,
      created_at: 1740003600000,
      namespace: 'health:biometrics',
      context: { window: 'sleep_cycle_3', deviation: '+20.6%' },
    },
    readers: [
      { agent: 'HealthPulse', use: 'alert triage' },
      { agent: 'FitCoach', use: 'workout adjustment' },
      { agent: 'NestMind', use: 'environment tuning' },
    ],
  },
  {
    type: 'Goal',
    typeHex: '0x07',
    color: 'var(--goal)',
    agent: 'SprintBot',
    company: 'TaskForge',
    description:
      'Active objective with structured success criteria. CI/CD and monitoring agents align optimization targets to this grain.',
    hash: 'e1d42f98…4a37',
    payload: {
      type: 'goal',
      subject: 'user:john-smith',
      description: 'Reduce API p99 latency below 120ms',
      goal_state: 'active',
      source_type: 'user_explicit',
      priority: 2,
      progress: 0.15,
      created_at: 1740009200000,
      valid_to: 1751270400000,
      criteria: ['p99 < 120ms for 7 consecutive days'],
    },
    readers: [
      { agent: 'DeployBot', use: 'CI/CD targeting' },
      { agent: 'MetricsMind', use: 'SLO alignment' },
    ],
  },
  {
    type: 'Action',
    typeHex: '0x05',
    color: 'var(--action)',
    agent: 'WealthSense',
    company: 'FinEdge',
    description:
      'Full input/output audit trail preserved after a portfolio rebalance execution. Tax and compliance agents reference the record.',
    hash: '7b21ea63…d0f8',
    payload: {
      type: 'action',
      tool_name: 'portfolio.rebalance',
      input: { account: '401k-primary', target_bonds: 0.4, strategy: 'tax_loss_harvest' },
      content: { status: 'executed', trades: 3, net_change_pct: -0.12 },
      is_error: false,
      duration_ms: 847,
      created_at: 1740012800000,
      namespace: 'finance:trading',
      user_id: 'john-smith',
    },
    readers: [
      { agent: 'TaxBot', use: 'deduction tracking' },
      { agent: 'CompliBot', use: 'audit trail' },
    ],
  },
  {
    type: 'Workflow',
    typeHex: '0x04',
    color: 'var(--workflow)',
    agent: 'FitCoach',
    company: 'KineticAI',
    description:
      'Learned trigger-response pattern. Home automation and calendar agents execute the steps when the trigger fires.',
    hash: 'f5c086b2…1e4c',
    payload: {
      type: 'workflow',
      trigger: 'hr_above_baseline_15min',
      steps: ['breathing_exercise', 'dim_lights_40pct', 'journal_prompt'],
      created_at: 1740016400000,
      importance: 0.82,
      namespace: 'wellness:routines',
    },
    readers: [
      { agent: 'NestMind', use: 'light/temp automation' },
      { agent: 'CalendarBot', use: 'schedule blocks' },
      { agent: 'HealthPulse', use: 'outcome tracking' },
    ],
  },
  {
    type: 'State',
    typeHex: '0x03',
    color: 'var(--state)',
    agent: 'EduMentor',
    company: 'LearnPath',
    description:
      'Agent state snapshot with acquired skills and planned next steps. HR credentialing agents verify competencies on job change.',
    hash: '92ab1d07…f653',
    payload: {
      type: 'state',
      context: {
        course: 'applied_ml_foundations',
        chapter: 7,
        completion: 0.68,
        skills: ['regression', 'classification', 'cross_validation'],
      },
      created_at: 1740020000000,
      plan: ['complete_chapter_8', 'take_midterm_exam'],
      user_id: 'john-smith',
    },
    readers: [
      { agent: 'HireBot', use: 'credential verification' },
      { agent: 'CareerCoach', use: 'upskill planning' },
    ],
  },
  {
    type: 'Reasoning',
    typeHex: '0x08',
    color: 'var(--reasoning)',
    agent: 'DiagnoseAI',
    company: 'MediCorp',
    description:
      'Inference chain and thought audit trail captured from an LLM diagnostic session. Enables human review before the conclusion drives automated treatment decisions.',
    hash: 'd3a91c55…8f02',
    payload: {
      type: 'reasoning',
      premises: ['hr_elevated_3_nights', 'spo2_dip_below_94pct'],
      conclusion: 'possible_sleep_apnea',
      inference_method: 'abductive',
      requires_human_review: true,
      created_at: 1740024000000,
      namespace: 'health:diagnostics',
    },
    readers: [
      { agent: 'HealthPulse', use: 'clinical review queue' },
      { agent: 'InsureAI', use: 'risk assessment' },
    ],
  },
  {
    type: 'Consensus',
    typeHex: '0x09',
    color: 'var(--consensus)',
    agent: 'RiskCommittee',
    company: 'FinEdge',
    description:
      'Three compliance agents independently assessed a high-value trading decision. A quorum reached agreement — the result is immutable and auditable across jurisdictions.',
    hash: '5c2f8a14…7d91',
    payload: {
      type: 'consensus',
      participating_observers: ['risk-ai-1', 'compliance-ai-2', 'audit-ai-3'],
      threshold: 2,
      agreement_count: 3,
      dissent_count: 0,
      agreed_content: { verdict: 'approved', risk_score: 0.18 },
      created_at: 1740022400000,
      namespace: 'finance:compliance',
    },
    readers: [
      { agent: 'AuditBot', use: 'multi-agent evidence' },
      { agent: 'RegBot', use: 'jurisdiction filing' },
    ],
  },
  {
    type: 'Consent',
    typeHex: '0x0A',
    color: 'var(--consent)',
    agent: 'PrivacyVault',
    company: 'TrustLayer',
    description:
      'User grants HealthPulse permission to retain biometric readings for 12 months. Consent grain is DID-scoped and purpose-bounded — revoke it to trigger cascading erasure.',
    hash: 'b8e204f1…3c90',
    payload: {
      type: 'consent',
      subject_did: 'did:key:z6MkjRag…',
      grantee_did: 'did:web:healthpulse.io',
      scope: ['health:biometrics:read', 'health:biometrics:retain'],
      basis: 'explicit_consent',
      jurisdiction: 'EU',
      is_withdrawal: false,
      created_at: 1740028800000,
    },
    readers: [
      { agent: 'CompliBot', use: 'GDPR evidence' },
      { agent: 'ErasureBot', use: 'deletion scoping' },
    ],
  },
]

/* ── JSON formatting ──────────────────────────────────────── */

function formatJson(payload: Record<string, unknown>): string {
  let json = JSON.stringify(payload, null, 2)
  // Collapse short primitive arrays to a single line
  json = json.replace(/\[\n\s+([\s\S]*?)\n\s+\]/g, (match, inner) => {
    const collapsed = '[' + inner.replace(/\n\s+/g, ' ') + ']'
    if (collapsed.length < 65 && !collapsed.includes('{')) return collapsed
    return match
  })
  return json
}

/* ── JSON syntax highlighting ─────────────────────────────── */

const C = {
  key: 'var(--accent)',
  str: 'var(--workflow)',
  num: 'var(--observation)',
  bool: 'var(--state)',
  punct: 'var(--fg-secondary)',
}

function renderValue(val: string): ReactNode {
  const trimmed = val.trimEnd()
  const comma = trimmed.endsWith(',')
  const clean = comma ? trimmed.slice(0, -1) : trimmed

  if (clean.startsWith('"') && clean.endsWith('"'))
    return (
      <>
        <span style={{ color: C.str }}>{clean}</span>
        {comma && <span style={{ color: C.punct }}>,</span>}
      </>
    )
  if (clean === 'true' || clean === 'false')
    return (
      <>
        <span style={{ color: C.bool }}>{clean}</span>
        {comma && <span style={{ color: C.punct }}>,</span>}
      </>
    )
  if (clean === 'null')
    return <span style={{ color: C.punct }}>{val}</span>
  if (/^-?\d+\.?\d*$/.test(clean))
    return (
      <>
        <span style={{ color: C.num }}>{clean}</span>
        {comma && <span style={{ color: C.punct }}>,</span>}
      </>
    )
  return <span style={{ color: C.punct }}>{val}</span>
}

function highlightJson(payload: Record<string, unknown>): ReactNode {
  const json = formatJson(payload)
  const lines = json.split('\n')

  return lines.map((line, i) => {
    let content: ReactNode

    // Key-value: "key": value
    const kv = line.match(/^(\s*)"([^"]+)":\s*(.*)$/)
    if (kv) {
      content = (
        <>
          <span style={{ color: C.punct }}>{kv[1]}</span>
          <span style={{ color: C.key }}>&quot;{kv[2]}&quot;</span>
          <span style={{ color: C.punct }}>: </span>
          {renderValue(kv[3])}
        </>
      )
    }
    // Standalone string in array: "value",
    else if (/^\s*"/.test(line)) {
      const sv = line.match(/^(\s*)"((?:[^"\\]|\\.)*)"(,?)$/)
      if (sv) {
        content = (
          <>
            <span style={{ color: C.punct }}>{sv[1]}</span>
            <span style={{ color: C.str }}>&quot;{sv[2]}&quot;</span>
            <span style={{ color: C.punct }}>{sv[3]}</span>
          </>
        )
      } else {
        content = <span style={{ color: C.punct }}>{line}</span>
      }
    }
    // Everything else: brackets, braces, etc.
    else {
      content = <span style={{ color: C.punct }}>{line}</span>
    }

    return (
      <Fragment key={i}>
        {content}
        {i < lines.length - 1 ? '\n' : ''}
      </Fragment>
    )
  })
}

/* ── Component ────────────────────────────────────────────── */

export function GrainShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayIndex, setDisplayIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === activeIndex) return
      setDirection(index > activeIndex ? 'next' : 'prev')
      setIsTransitioning(true)
      setActiveIndex(index)
      setTimeout(() => {
        setDisplayIndex(index)
        setTimeout(() => setIsTransitioning(false), 50)
      }, 250)
    },
    [activeIndex, isTransitioning]
  )

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % cards.length
    setDirection('next')
    setIsTransitioning(true)
    setActiveIndex(next)
    setTimeout(() => {
      setDisplayIndex(next)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 250)
  }, [activeIndex])

  const goPrev = useCallback(() => {
    const prev = (activeIndex - 1 + cards.length) % cards.length
    setDirection('prev')
    setIsTransitioning(true)
    setActiveIndex(prev)
    setTimeout(() => {
      setDisplayIndex(prev)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 250)
  }, [activeIndex])

  // Auto-rotation
  useEffect(() => {
    if (isPaused) return
    const id = setInterval(goNext, 4500)
    return () => clearInterval(id)
  }, [isPaused, goNext])

  // Keyboard navigation
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
    }
    el.addEventListener('keydown', handleKey)
    return () => el.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  const card = cards[displayIndex]

  const exitAnim = isTransitioning
    ? direction === 'next'
      ? 'grainSlideOut 0.25s ease-in forwards'
      : 'grainSlideOutReverse 0.25s ease-in forwards'
    : undefined

  const enterAnim =
    !isTransitioning && displayIndex === activeIndex
      ? direction === 'next'
        ? 'grainSlideIn 0.3s ease-out forwards'
        : 'grainSlideInReverse 0.3s ease-out forwards'
      : undefined

  const arrowStyle: React.CSSProperties = {
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    color: 'var(--fg-muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'border-color 0.2s, color 0.2s',
    padding: 0,
  }

  return (
    <section
      aria-label="Grain examples in practice"
      style={{
        padding: 'clamp(4rem, 8vw, 6rem) 0',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container-content">
        {/* Section heading */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: 600,
            margin: '0 auto',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          <p
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--accent)',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            In Practice
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
            Any AI agent. One memory. Portable everywhere.
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--fg-secondary)',
              lineHeight: 1.7,
            }}
          >
            Imagine grains written by different AI systems &mdash; and read
            by others across industries, without any prior arrangement.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Memory grain examples from John Smith's portable memory"
          tabIndex={0}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(e) => {
            if (!containerRef.current?.contains(e.relatedTarget as Node)) {
              setIsPaused(false)
            }
          }}
          style={{ outline: 'none' }}
        >
          {/* Screen reader announcer */}
          <div aria-live="polite" className="sr-only" role="status">
            {`Slide ${activeIndex + 1} of ${cards.length}: ${card.type} grain by ${card.agent}`}
          </div>

          {/* Card + arrows row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
            }}
          >
            {/* Left arrow */}
            <button
              className="grain-nav-arrow"
              aria-label="Previous grain"
              onClick={goPrev}
              style={arrowStyle}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Card container — fixed height prevents layout shift */}
            <div
              className="grain-card-container"
              style={{
                display: 'flex',
                justifyContent: 'center',
                flex: '0 1 1060px',
              }}
            >
              <div
                role="group"
                aria-roledescription="slide"
                aria-label={`${activeIndex + 1} of ${cards.length}: ${card.type} grain — ${card.description}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  textAlign: 'left',
                  width: '100%',
                  animation: exitAnim || enterAnim,
                }}
              >
                {/* Color bar */}
                <div
                  aria-hidden="true"
                  style={{
                    height: 4,
                    background: 'var(--accent)',
                    flexShrink: 0,
                  }}
                />

                {/* Three-column body */}
                <div
                  className="grain-card-grid"
                  style={{ flex: 1, minHeight: 0 }}
                >
                  {/* Left: Write */}
                  <div
                    style={{
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        marginBottom: 14,
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--fg-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      <PenLine size={12} aria-hidden="true" />
                      Written by
                    </div>

                    <div
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--fg)',
                        marginBottom: 2,
                      }}
                    >
                      {card.agent}
                    </div>
                    <div
                      style={{
                        fontSize: '0.8125rem',
                        color: 'var(--fg-muted)',
                        fontFamily: 'var(--font-mono)',
                        marginBottom: 14,
                      }}
                    >
                      {card.company}
                    </div>

                    <div
                      aria-hidden="true"
                      style={{
                        height: 1,
                        background: 'var(--border-subtle)',
                        marginBottom: 14,
                      }}
                    />

                    <p
                      style={{
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                        color: 'var(--fg-secondary)',
                      }}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Middle: Grain content */}
                  <div
                    style={{
                      borderLeft: '1px solid var(--border-subtle)',
                      borderRight: '1px solid var(--border-subtle)',
                      background: 'var(--code-bg)',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        padding: '1rem 1.25rem 0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          fontWeight: 600,
                          color: 'var(--accent)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'var(--accent)',
                            display: 'inline-block',
                            flexShrink: 0,
                          }}
                        />
                        {card.type} · {card.typeHex}
                      </span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: '0.65rem',
                          color: 'var(--fg-muted)',
                        }}
                      >
                        v1 ·{' '}
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: 'var(--accent)' }}>
                          <ShieldCheck size={11} aria-hidden="true" />
                          COSE Signed
                        </span>
                      </span>
                    </div>

                    <pre
                      style={{
                        margin: 0,
                        padding: '0 1.25rem 1.25rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(0.6875rem, 1.2vw, 0.75rem)',
                        lineHeight: 1.65,
                        overflowY: 'hidden',
                        overflowX: 'auto',
                        whiteSpace: 'pre',
                        flex: 1,
                        minHeight: 0,
                      }}
                    >
                      {highlightJson(card.payload)}
                    </pre>
                  </div>

                  {/* Right: Read */}
                  <div
                    style={{
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        marginBottom: 14,
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--fg-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      <Eye size={12} aria-hidden="true" />
                      Read by
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                      }}
                    >
                      {card.readers.map((r) => (
                        <div key={r.agent}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              color: 'var(--fg)',
                              marginBottom: 2,
                            }}
                          >
                            <span
                              aria-hidden="true"
                              style={{
                                width: 5,
                                height: 5,
                                borderRadius: '50%',
                                background: 'var(--accent)',
                                flexShrink: 0,
                              }}
                            />
                            {r.agent}
                          </div>
                          <div
                            style={{
                              fontSize: '0.8125rem',
                              color: 'var(--fg-muted)',
                              paddingLeft: 11,
                            }}
                          >
                            {r.use}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right arrow */}
            <button
              className="grain-nav-arrow"
              aria-label="Next grain"
              onClick={goNext}
              style={arrowStyle}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Navigation dots */}
          <div
            role="tablist"
            aria-label="Choose a grain slide"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
              marginTop: 20,
            }}
          >
            {cards.map((c, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`${c.type} grain by ${c.agent} (${i + 1} of ${cards.length})`}
                tabIndex={i === activeIndex ? 0 : -1}
                onClick={() => goTo(i)}
                style={{
                  width: i === activeIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: 'none',
                  background: i === activeIndex ? 'var(--accent)' : 'var(--border)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <style>{`.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`}</style>
        </div>
      </div>
    </section>
  )
}
