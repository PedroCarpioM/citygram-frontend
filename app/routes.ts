import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/public/home.tsx'),
  route('buscar', 'routes/public/search.tsx'),
  route('propiedades/:id', 'routes/public/listing-detail.tsx'),
  route('iniciar-sesion', 'routes/public/login.tsx'),
] satisfies RouteConfig
