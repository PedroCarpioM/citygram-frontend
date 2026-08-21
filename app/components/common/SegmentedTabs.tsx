type SegmentedTabsVariant = 'solid' | 'pill'

interface SegmentedTabsProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  variant?: SegmentedTabsVariant
}

const variantStyles: Record<
  SegmentedTabsVariant,
  { base: string; active: string; inactive: string }
> = {
  solid: {
    base: 'rounded-md px-4.5 py-3 text-body font-bold',
    active: 'border-2 border-transparent bg-pink-500 text-white',
    inactive: 'border-2 border-ink-200 bg-white text-ink-900',
  },
  pill: {
    base: 'rounded-full px-4.5 py-2.5 text-body-sm font-semibold',
    active: 'border-2 border-pink-500 bg-pink-500 text-white',
    inactive: 'border-2 border-ink-200 bg-white text-ink-600',
  },
}

export function SegmentedTabs({ options, value, onChange, variant = 'solid' }: SegmentedTabsProps) {
  const styles = variantStyles[variant]
  const containerClasses =
    variant === 'pill' ? 'flex flex-wrap gap-2.5' : 'flex gap-2.5 overflow-x-auto'

  return (
    <div className={containerClasses} role="group">
      {options.map((option) => {
        const active = option === value
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={active}
            className={`shrink-0 transition duration-fast active:scale-[0.97] ${styles.base} ${
              active ? styles.active : styles.inactive
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
