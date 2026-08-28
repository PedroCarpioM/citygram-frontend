import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

import { Button } from '~/components/common/Button'
import { ProfileMenu } from '~/components/common/ProfileMenu'
import { useAuth } from '~/hooks/useAuth'
import { MIS_PUBLICACIONES_PATH, NUEVA_PUBLICACION_PATH } from '~/utils/routes'

const NAV_LINKS = ['Comprar', 'Alquilar', 'Anticretar']

const linkClasses =
  'text-body-sm font-semibold text-ink-900 transition-colors duration-fast hover:text-pink-500 hover:no-underline'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  return (
    <div className="relative flex items-center justify-between border-b border-ink-100 bg-white px-6 py-3.5">
      <img src="/images/brand/isologo.jpg" alt="CityGram" className="h-8 w-auto" />

      <nav className="hidden items-center gap-6 sm:flex">
        {NAV_LINKS.map((link) => (
          <a key={link} href="#" className={linkClasses}>
            {link}
          </a>
        ))}
        {isAuthenticated ? (
          <>
            <Link to={MIS_PUBLICACIONES_PATH} className={linkClasses}>
              Mis publicaciones
            </Link>
            <Link to={NUEVA_PUBLICACION_PATH}>
              <Button variant="primary" size="sm">
                Hacer una publicación
              </Button>
            </Link>
            <ProfileMenu />
          </>
        ) : (
          <Button variant="primary" size="sm">
            Pon tu anuncio gratis
          </Button>
        )}
      </nav>

      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        className="relative flex h-8 w-8 items-center justify-center text-ink-900 sm:hidden"
      >
        <Menu
          aria-hidden
          size={22}
          className={`absolute transition-all duration-base ${
            menuOpen ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'
          }`}
        />
        <X
          aria-hidden
          size={22}
          className={`absolute transition-all duration-base ${
            menuOpen ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'
          }`}
        />
      </button>

      <div
        className={`absolute inset-x-0 top-full z-20 grid overflow-hidden border-b border-ink-100 bg-white shadow-elevated transition-[grid-template-rows] duration-base ease-out sm:hidden ${
          menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div
          aria-hidden={!menuOpen}
          className={`flex min-h-0 flex-col px-6 pt-2 pb-4 transition-opacity duration-base ${
            menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className={`border-b border-ink-100 py-3 ${linkClasses}`}>
              {link}
            </a>
          ))}
          {isAuthenticated ? (
            <>
              <Link
                to={MIS_PUBLICACIONES_PATH}
                className={`border-b border-ink-100 py-3 ${linkClasses}`}
              >
                Mis publicaciones
              </Link>
              <Link to={NUEVA_PUBLICACION_PATH} className="mt-4">
                <Button variant="primary" size="sm" className="w-full">
                  Hacer una publicación
                </Button>
              </Link>
              <div className="mt-4 flex justify-end">
                <ProfileMenu />
              </div>
            </>
          ) : (
            <Button variant="primary" size="sm" className="mt-4">
              Pon tu anuncio gratis
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
