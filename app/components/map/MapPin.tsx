interface MapPinProps {
  price?: string | null
  size?: 'sm' | 'md'
}

export function MapPin({ price, size = 'md' }: MapPinProps) {
  const dim = size === 'sm' ? 34 : 44

  return (
    <div className="inline-flex flex-col items-center font-body">
      {price ? (
        <span className="mb-1 rounded-sm bg-white px-2 py-1 text-xs font-bold text-ink-900 shadow-card">
          {price}
        </span>
      ) : null}
      <svg width={dim} height={dim * 1.2} viewBox="0 0 44 52" fill="none">
        <path
          d="M22 0C9.85 0 0 9.85 0 22c0 16.5 22 30 22 30s22-13.5 22-30C44 9.85 34.15 0 22 0z"
          style={{ fill: 'var(--color-purple-500)' }}
        />
        <path d="M22 12l9 7v11h-6v-6h-6v6h-6V19z" fill="#fff" />
      </svg>
    </div>
  )
}
