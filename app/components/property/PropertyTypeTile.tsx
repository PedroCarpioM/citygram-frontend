export type PropertyTypeKey =
  'vivienda' | 'departamento' | 'terreno' | 'local' | 'oficina' | 'hotel'

const icons: Record<PropertyTypeKey, string> = {
  vivienda: '/images/property-types/vivienda.jpg',
  departamento: '/images/property-types/departamento.jpg',
  terreno: '/images/property-types/terreno.jpg',
  local: '/images/property-types/local.jpg',
  oficina: '/images/property-types/oficina.jpg',
  hotel: '/images/property-types/hotel.jpg',
}

interface PropertyTypeTileProps {
  type: PropertyTypeKey
  label: string
  active: boolean
  onClick: () => void
}

export function PropertyTypeTile({ type, label, active, onClick }: PropertyTypeTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-2 rounded-lg border-2 bg-white px-2 py-3.5 font-body ${
        active ? 'border-brand-primary' : 'border-ink-200'
      }`}
    >
      <img src={icons[type]} alt={label} className="h-10 w-10 object-contain" />
      <span className={`text-body-sm font-bold ${active ? 'text-brand-primary' : 'text-ink-900'}`}>
        {label}
      </span>
    </button>
  )
}
