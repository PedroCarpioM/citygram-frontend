interface SegmentedTabsProps {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export function SegmentedTabs({ options, value, onChange }: SegmentedTabsProps) {
  return (
    <div className="flex gap-2.5">
      {options.map((option) => {
        const active = option === value
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-md px-4.5 py-3 text-body font-bold transition ${
              active
                ? 'border-2 border-transparent bg-pink-500 text-white'
                : 'border-2 border-ink-200 bg-white text-ink-900'
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
