import { GoogleLogin } from '@react-oauth/google'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import type { Route } from './+types/login'
import { Footer } from '~/components/common/Footer'
import { Navbar } from '~/components/common/Navbar'
import { useAuth } from '~/hooks/useAuth'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Iniciar sesión · CityGram' },
    {
      name: 'description',
      content:
        'Inicia sesión con tu cuenta de Google para gestionar tus propiedades y publicaciones.',
    },
  ]
}

export default function Login() {
  const navigate = useNavigate()
  const { isLoggingIn, loginError, isAuthenticated, handleGoogleCredential } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (loginError) {
      toast.error('No pudimos iniciar tu sesión. Intenta nuevamente.')
    }
  }, [loginError])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm rounded-lg bg-white p-8 text-center shadow-card">
          <img src="/images/brand/isologo.jpg" alt="CityGram" className="mx-auto mb-6 h-8 w-auto" />

          <h1 className="text-display-md font-display font-bold text-ink-900">Inicia sesión</h1>
          <p className="mt-2 text-body-sm text-ink-600">
            Accede a tu panel de dueño para publicar y gestionar tus propiedades.
          </p>

          <div className="mt-8 flex justify-center">
            {isLoggingIn ? (
              <div className="text-body-sm font-semibold text-ink-600">Iniciando sesión…</div>
            ) : (
              <GoogleLogin
                onSuccess={(credentialResponse) =>
                  handleGoogleCredential(credentialResponse.credential)
                }
                onError={() => toast.error('No pudimos iniciar tu sesión. Intenta nuevamente.')}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
