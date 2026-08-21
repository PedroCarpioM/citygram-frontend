import { ChevronDown } from 'lucide-react'

interface SelectProps {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
  gradientLabel?: boolean
}

export function Select({ label, value, options, onChange, gradientLabel = false }: SelectProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        className={`text-caption font-bold uppercase tracking-wide ${gradientLabel ? 'text-white' : 'text-ink-600'}`}
      >
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-md bg-white py-3.5 pr-9 pl-4 text-base text-ink-900"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          size={16}
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-600"
        />
      </div>
    </label>
  )
}
