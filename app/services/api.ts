import axios, { type AxiosError } from 'axios'

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ detail?: string; title?: string }>) => {
    const detail = error.response?.data?.detail ?? error.response?.data?.title
    return Promise.reject(detail ? new Error(detail) : error)
  },
)
