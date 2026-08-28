import { Briefcase, Building2, Home, Hotel, LandPlot, Store } from 'lucide-react'
import type { PropertyTypeKey } from '~/components/property/PropertyTypeTile'

interface MapPinProps {
  price?: string | null
  size?: 'sm' | 'md'
  type?: PropertyTypeKey | null
}

const TYPE_ICONS: Record<PropertyTypeKey, typeof Home> = {
  vivienda: Home,
  departamento: Building2,
  terreno: LandPlot,
  local: Store,
  oficina: Briefcase,
  hotel: Hotel,
}

export function MapPin({ price, size = 'md', type }: MapPinProps) {
  const dim = size === 'sm' ? 34 : 44
  const Icon = (type && TYPE_ICONS[type]) || Home
  const iconSize = dim * 0.36

  return (
    <div className="inline-flex flex-col items-center font-body">
      {price ? (
        <span className="mb-1 rounded-sm bg-white px-2 py-1 text-xs font-bold text-ink-900 shadow-card">
          {price}
        </span>
      ) : null}
      <div className="relative" style={{ width: dim, height: dim * 1.2 }}>
        <svg width={dim} height={dim * 1.2} viewBox="0 0 44 52" fill="none">
          <path
            d="M22 0C9.85 0 0 9.85 0 22c0 16.5 22 30 22 30s22-13.5 22-30C44 9.85 34.15 0 22 0z"
            style={{ fill: 'var(--color-purple-500)' }}
          />
        </svg>
        <Icon
          color="#fff"
          width={iconSize}
          height={iconSize}
          strokeWidth={2.25}
          className="absolute left-1/2 top-[19px] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  )
}
