import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AuthenticationResponse } from '~/types/auth'

interface AuthState {
  accessToken: string | null
  userId: string | null
  expiresAt: string | null
  claims: Record<string, unknown> | null
  setSession: (response: AuthenticationResponse) => void
  clearSession: () => void
  isSessionValid: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      userId: null,
      expiresAt: null,
      claims: null,
      setSession: (response) => {
        let claims: Record<string, unknown> | null = null
        if (response.accessToken) {
          try {
            claims = jwtDecode<Record<string, unknown>>(response.accessToken)
          } catch {
            claims = null
          }
        }
        set({
          accessToken: response.accessToken,
          userId: response.userId,
          expiresAt: response.expiresAt,
          claims,
        })
      },
      clearSession: () => set({ accessToken: null, userId: null, expiresAt: null, claims: null }),
      isSessionValid: () => {
        const { accessToken, expiresAt } = get()
        if (!accessToken || !expiresAt) return false
        return new Date(expiresAt).getTime() > Date.now()
      },
    }),
    { name: 'citygram-auth' },
  ),
)
