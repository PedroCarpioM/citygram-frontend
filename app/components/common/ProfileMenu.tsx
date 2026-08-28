import { LogOut, UserCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { useAuth } from '~/hooks/useAuth'

function getInitials(name: string | null, email: string | null) {
  const source = name ?? email
  if (!source) return null
  const parts = source.trim().split(/\s+/)
  const initials = parts
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
  return initials.toUpperCase() || null
}

export function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { name, email, picture, logout } = useAuth()

  useEffect(() => {
    if (!open) return

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function handleLogout() {
    logout()
    setOpen(false)
    navigate('/', { replace: true })
  }

  const initials = getInitials(name, email)

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Abrir menú de perfil"
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-ink-100 bg-ink-50 text-ink-900 transition-colors duration-fast hover:border-pink-500"
      >
        {picture ? (
          <img
            src={picture}
            alt=""
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        ) : initials ? (
          <span className="text-body-sm font-semibold">{initials}</span>
        ) : (
          <UserCircle aria-hidden size={22} />
        )}
      </button>

      <div
        role="menu"
        className={`absolute top-full right-0 z-30 mt-2 w-64 origin-top-right rounded-lg border border-ink-100 bg-white shadow-elevated transition-all duration-base ${
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-ink-100 bg-ink-50 text-ink-900">
            {picture ? (
              <img
                src={picture}
                alt=""
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            ) : initials ? (
              <span className="text-body-sm font-semibold">{initials}</span>
            ) : (
              <UserCircle aria-hidden size={24} />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-body-sm font-semibold text-ink-900">{name ?? 'Usuario'}</p>
            {email && <p className="truncate text-body-sm text-ink-600">{email}</p>}
          </div>
        </div>

        <div className="border-t border-ink-100" />

        {/* Espacio para futuras opciones de perfil (p. ej. "Mi cuenta", preferencias) cuando el backend las soporte */}

        <div className="border-t border-ink-100 p-1.5">
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-body-sm font-semibold text-ink-900 transition-colors duration-fast hover:bg-ink-50"
          >
            <LogOut aria-hidden size={18} />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}
