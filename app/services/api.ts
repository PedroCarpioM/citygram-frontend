import axios, { type AxiosError } from 'axios'

import { useAuthStore } from '~/store/auth'

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState()
  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`)
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ detail?: string; title?: string }>) => {
    const detail = error.response?.data?.detail ?? error.response?.data?.title
    return Promise.reject(detail ? new Error(detail) : error)
  },
)
