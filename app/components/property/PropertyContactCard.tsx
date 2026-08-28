import { useState } from 'react'
import { Button } from '~/components/common/Button'

interface PropertyContactCardProps {
  userName: string
  contactPhone: string | null
}

function initialsOf(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function PropertyContactCard({ userName, contactPhone }: PropertyContactCardProps) {
  const [phoneRevealed, setPhoneRevealed] = useState(false)

  return (
    <div className="flex flex-col gap-3.5 rounded-lg border border-ink-100 bg-white p-5 shadow-card">
      <div className="flex items-center gap-3">
        <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-gradient-brand text-base font-extrabold text-white">
          {initialsOf(userName)}
        </div>
        <div>
          <div className="text-caption font-bold uppercase tracking-wide text-ink-400">
            Anunciante
          </div>
          <div className="text-body font-bold text-ink-900">{userName}</div>
        </div>
      </div>
      <Button variant="primary" size="lg" className="w-full">
        Contactar
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => setPhoneRevealed(true)}
        disabled={!contactPhone}
      >
        {phoneRevealed && contactPhone ? contactPhone : 'Ver teléfono'}
      </Button>
    </div>
  )
}
