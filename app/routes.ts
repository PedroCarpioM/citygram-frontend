import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/public/home.tsx'),
  route('buscar', 'routes/public/search.tsx'),
  route('code', 'routes/public/code.tsx'),
  route('iniciar-sesion', 'routes/public/login.tsx'),
] satisfies RouteConfig
