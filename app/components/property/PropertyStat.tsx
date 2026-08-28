interface PropertyStatProps {
  icon: string
  value: number
  size?: 'sm' | 'md'
}

export function PropertyStat({ icon, value, size = 'sm' }: PropertyStatProps) {
  const dim = size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'
  const text = size === 'sm' ? 'text-sm' : 'text-body'
  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold text-ink-900 ${text}`}>
      <img src={icon} alt="" className={dim} />
      {value}
    </span>
  )
}
