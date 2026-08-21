import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '~/components/common/Button'

const NAV_LINKS = ['Comprar', 'Alquilar', 'Anticrético']

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative flex items-center justify-between border-b border-ink-100 bg-white px-6 py-3.5">
      <img src="/images/brand/isologo.jpg" alt="CityGram" className="h-8 w-auto" />

      <nav className="hidden items-center gap-6 sm:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="text-body-sm font-semibold text-ink-900 hover:no-underline"
          >
            {link}
          </a>
        ))}
        <Button variant="primary" size="sm">
          Pon tu anuncio gratis
        </Button>
      </nav>

      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        className="flex h-8 w-8 items-center justify-center text-ink-900 sm:hidden"
      >
        {menuOpen ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
      </button>

      {menuOpen && (
        <div className="absolute inset-x-0 top-full z-20 flex flex-col border-b border-ink-100 bg-white px-6 pt-2 pb-4 shadow-elevated sm:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="border-b border-ink-100 py-3 text-body font-semibold text-ink-900 hover:no-underline"
            >
              {link}
            </a>
          ))}
          <Button variant="primary" size="sm" className="mt-4">
            Pon tu anuncio gratis
          </Button>
        </div>
      )}
    </div>
  )
}
