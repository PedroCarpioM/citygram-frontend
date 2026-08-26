import { api } from './api'
import type { AuthenticationResponse, GoogleLoginRequest } from '~/types/auth'

export async function loginWithGoogle(body: GoogleLoginRequest) {
  const { data } = await api.post<AuthenticationResponse>('/auth/google', body)
  return data
}
