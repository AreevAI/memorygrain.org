type BadgeVariant = 'fact' | 'episode' | 'checkpoint' | 'workflow' | 'tool' | 'observation' | 'default'

const variantColors: Record<BadgeVariant, string> = {
  fact: 'var(--fact)',
  episode: 'var(--episode)',
  checkpoint: 'var(--checkpoint)',
  workflow: 'var(--workflow)',
  tool: 'var(--tool)',
  observation: 'var(--observation)',
  default: 'var(--fg-muted)',
}

interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const color = variantColors[variant]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '0.6875rem',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        padding: '0.2em 0.55em',
        borderRadius: 4,
        background: `color-mix(in srgb, ${color} 12%, transparent)`,
        color: color,
        border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
        fontFamily: 'var(--font-mono)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}
