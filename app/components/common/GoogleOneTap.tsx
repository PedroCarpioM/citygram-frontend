import { useGoogleOneTapLogin } from '@react-oauth/google'
import { useLocation } from 'react-router'

import { useAuth } from '~/hooks/useAuth'

export function GoogleOneTap() {
  const { isAuthenticated, handleGoogleCredential } = useAuth()
  const location = useLocation()
  const disabled = isAuthenticated || location.pathname === '/iniciar-sesion'

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => handleGoogleCredential(credentialResponse.credential),
    onError: () => {},
    disabled,
    cancel_on_tap_outside: true,
  })

  return null
}
