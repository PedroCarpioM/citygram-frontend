export interface GoogleLoginRequest {
  idToken: string | null
}

export interface AuthenticationResponse {
  userId: string
  accessToken: string | null
  expiresAt: string
}

export interface UserDTO {
  id: string
  firstName: string | null
  lastName: string | null
  email: string | null
}

export interface GoogleProfile {
  name: string | null
  email: string | null
  picture: string | null
}
