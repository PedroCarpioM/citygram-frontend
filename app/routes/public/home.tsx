import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'CityGram' }, { name: 'description', content: 'WIP! esto es el Citygram mvp' }]
}

export default function Home() {
  return 'WIP'
}
