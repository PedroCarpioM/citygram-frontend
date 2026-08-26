import { useMutation } from '@tanstack/react-query'

import { loginWithGoogle } from '~/services/auth'
import { useAuthStore } from '~/store/auth'

export function useAuth() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const userId = useAuthStore((state) => state.userId)
  const isSessionValid = useAuthStore((state) => state.isSessionValid)
  const setSession = useAuthStore((state) => state.setSession)
  const clearSession = useAuthStore((state) => state.clearSession)

  const loginMutation = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: setSession,
  })

  return {
    accessToken,
    userId,
    isAuthenticated: isSessionValid(),
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    logout: clearSession,
  }
}
