import { useMutation } from '@tanstack/react-query'

import { loginWithGoogle } from '~/services/auth'
import { useAuthStore } from '~/store/auth'

export function useAuth() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const userId = useAuthStore((state) => state.userId)
  const name = useAuthStore((state) => state.name)
  const email = useAuthStore((state) => state.email)
  const picture = useAuthStore((state) => state.picture)
  const isSessionValid = useAuthStore((state) => state.isSessionValid)
  const setSession = useAuthStore((state) => state.setSession)
  const setProfile = useAuthStore((state) => state.setProfile)
  const clearSession = useAuthStore((state) => state.clearSession)

  const loginMutation = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: setSession,
  })

  return {
    accessToken,
    userId,
    name,
    email,
    picture,
    isAuthenticated: isSessionValid(),
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    logout: clearSession,
    setProfile,
  }
}
