import { Check } from 'lucide-react'

interface FeatureListProps {
  items: string[]
}

export function FeatureList({ items }: FeatureListProps) {
  if (items.length === 0) return null

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2.5 text-body text-ink-900">
          <Check size={16} strokeWidth={3} aria-hidden className="shrink-0 text-brand-primary" />
          {item}
        </div>
      ))}
    </div>
  )
}
