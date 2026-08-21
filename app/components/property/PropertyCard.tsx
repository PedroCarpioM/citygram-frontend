const featureIcons = {
  beds: '/images/features/dormitorios.jpg',
  baths: '/images/features/banos.jpg',
  garages: '/images/features/garage.jpg',
}

interface PropertyCardProps {
  image: string
  zone: string
  price: string | number
  currency?: string
  beds: number
  baths: number
  garages?: number
  area?: number
  ctaLabel?: string
  onFavorite?: () => void
  favorited?: boolean
  compact?: boolean
}

function StatInline({ icon, value }: { icon: string; value: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900">
      <img src={icon} alt="" className="h-4 w-4" />
      {value}
    </span>
  )
}

export function PropertyCard({
  image,
  zone,
  price,
  currency = 'Sus/mes',
  beds,
  baths,
  garages,
  area,
  ctaLabel = '+ Info',
  onFavorite,
  favorited,
  compact = false,
}: PropertyCardProps) {
  if (compact) {
    return (
      <div className="flex w-72 items-center gap-2.5 font-body">
        <img src={image} alt={zone} className="h-14 w-14 flex-shrink-0 rounded-sm object-cover" />
        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="text-caption font-bold uppercase text-ink-400">{zone}</div>
          <div className="text-title font-display font-bold text-brand-primary">{price}</div>
          <div className="text-body-sm text-ink-600">
            {beds} hab · {baths} baños
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[22rem] overflow-hidden rounded-lg border border-ink-100 bg-white shadow-card">
      <div className="relative">
        <img src={image} alt={zone} className="h-[180px] w-full object-cover" />
        <div className="absolute inset-x-0 top-0 bg-ink-600/55 px-3.5 py-2.5 font-display text-base font-semibold text-white">
          {zone}
        </div>
        <button
          type="button"
          onClick={onFavorite}
          aria-label="Favorito"
          className={`absolute bottom-2.5 right-2.5 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/90 text-lg ${
            favorited ? 'text-pink-500' : 'text-ink-400'
          }`}
        >
          ♥
        </button>
      </div>
      <div className="flex flex-col gap-2.5 p-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-price font-display font-bold text-brand-primary">{price}</span>
          <span className="text-body-sm text-ink-600">{currency}</span>
        </div>
        <div className="flex gap-3.5">
          <StatInline icon={featureIcons.beds} value={beds} />
          <StatInline icon={featureIcons.baths} value={baths} />
          {garages !== undefined ? (
            <StatInline icon={featureIcons.garages} value={garages} />
          ) : null}
        </div>
        {area !== undefined ? (
          <div className="text-body-sm text-ink-600">Sup. {area} m²</div>
        ) : null}
        <button
          type="button"
          className="self-start rounded-md bg-brand-primary px-5 py-2.5 text-sm font-bold text-white"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  )
}
