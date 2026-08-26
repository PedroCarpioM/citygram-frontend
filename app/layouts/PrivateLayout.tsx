import { Navigate, Outlet } from 'react-router'

import { useAuthStore } from '~/store/auth'

export default function PrivateLayout() {
  const isSessionValid = useAuthStore((state) => state.isSessionValid)

  if (!isSessionValid()) {
    return <Navigate to="/iniciar-sesion" replace />
  }

  return <Outlet />
}
