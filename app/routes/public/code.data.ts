export interface CodeSnippet {
  id: string
  title: string
  filePath: string
  tags: string[]
  code: string
  explanation: string
}

/**
 * Curated excerpts pulled verbatim from this same repository. Kept in a data
 * file (mirrors the search.tsx/search.data.ts split) so the route component
 * only handles layout, not content.
 */
export const codeSnippets: CodeSnippet[] = [
  {
    id: 'api-error-interceptor',
    title: 'Errores de API normalizados en un solo lugar',
    filePath: 'app/services/api.ts',
    tags: ['Manejo de errores', 'Axios'],
    code: `import axios, { type AxiosError } from 'axios'

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ detail?: string; title?: string }>) => {
    const detail = error.response?.data?.detail ?? error.response?.data?.title
    return Promise.reject(detail ? new Error(detail) : error)
  },
)`,
    explanation:
      'Un único interceptor traduce las distintas formas en que el backend puede describir un error (detail, title, o ninguno) a un Error de JavaScript legible. Cada hook de React Query recibe siempre el mismo tipo de excepción sin tener que repetir esa lógica de extracción en cada llamada, que es justo el problema que la carpeta services/ del proyecto existe para resolver.',
  },
  {
    id: 'map-public-listing',
    title: 'Capa anti-corrupción entre el DTO del backend y el dominio del front',
    filePath: 'app/utils/listing.ts',
    tags: ['Modelado de datos', 'TypeScript'],
    code: `export function mapPublicListing(dto: PublicListingDTO): PropertyListing {
  return {
    id: dto.id,
    lat: dto.latitude,
    lng: dto.longitude,
    zone: dto.propertyAddress ?? dto.city ?? 'Sin dirección',
    image: dto.propertyImages?.[0] ?? PLACEHOLDER_IMAGE,
    price: dto.price ?? '',
    priceValue: parsePrice(dto.price),
    operationType: dto.type,
    beds: dto.bedrooms ?? 0,
    baths: dto.bathrooms ?? 0,
  }
}`,
    explanation:
      'El tipo PublicListingDTO refleja el JSON crudo del backend (campos nulos incluidos); PropertyListing es el modelo que el resto de la UI consume. Esta función es la única que conoce las reglas de fallback (dirección → ciudad → texto por defecto, imagen placeholder, precio ya parseado a número), así que componentes como el mapa o las tarjetas nunca tienen que lidiar con null. Si el contrato del backend cambia, el punto de ajuste es uno solo.',
  },
  {
    id: 'parse-price',
    title: 'Parseo defensivo de un precio con formato regional',
    filePath: 'app/utils/listing.ts',
    tags: ['Edge cases', 'Documentación'],
    code: `/**
 * Parses a Bolivian-formatted price string ("620.000", \`.\` as thousands
 * separator) into a number. Returns null when unparseable so callers can
 * exclude priceless listings from range filters instead of treating them as 0.
 */
export function parsePrice(value: string | null | undefined): number | null {
  if (!value) return null
  const normalized = value.replace(/[^\\d]/g, '')
  if (!normalized) return null
  const n = Number(normalized)
  return Number.isFinite(n) ? n : null
}`,
    explanation:
      'La función documenta un detalle no obvio del dominio: en Bolivia el punto es separador de miles, no decimal, así que "620.000" son 620 mil, no 620. La decisión clave es devolver null en vez de 0 cuando el precio no se puede interpretar — así un filtro de "precio mínimo" no descarta por error una propiedad que simplemente no tiene precio cargado. Ese razonamiento queda explícito en el comentario en vez de tener que reconstruirlo leyendo el código que lo consume.',
  },
  {
    id: 'matches-operation',
    title: 'Comparación de texto tolerante a acentos, con la incertidumbre documentada',
    filePath: 'app/utils/listing.ts',
    tags: ['i18n', 'Deuda técnica documentada'],
    code: `function normalizeText(value: string) {
  return value.normalize('NFD').replace(COMBINING_DIACRITICS, '').trim().toLowerCase()
}

/**
 * Best-effort, accent/case-insensitive match between a listing's raw \`type\`
 * string and one of the operation tab labels (Venta/Alquiler/Anticrético).
 * See docs/backend_requirements.md — this mapping is inferred, not confirmed.
 */
export function matchesOperation(operationType: string | null, selected: string): boolean {
  if (!operationType) return false
  return normalizeText(operationType) === normalizeText(selected)
}`,
    explanation:
      'Compara "Anticrético" contra "anticretico" o "ANTICRÉTICO" normalizando con Unicode NFD en vez de una lista de reemplazos manual de tildes, que es la forma correcta y más robusta de hacerlo. Lo más relevante es el comentario: dice explícitamente que el mapeo con el backend es una inferencia, no algo confirmado, y apunta al documento donde ese hueco está registrado — evita que alguien confunda una suposición temporal con una regla de negocio ya validada.',
  },
  {
    id: 'use-mounted',
    title: 'Evitar el desajuste de hidratación SSR al cargar Leaflet',
    filePath: 'app/routes/public/search.tsx',
    tags: ['SSR', 'React Router'],
    code: `function subscribeNoop() {
  return () => {}
}

/** True only once hydrated on the client — keeps Leaflet's module graph out of the SSR render. */
function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  )
}`,
    explanation:
      'Leaflet toca window/document, así que no puede renderizarse durante el server-side render de React Router. useSyncExternalStore con un snapshot de servidor fijo en false es la forma soportada por React de detectar "ya estoy en el cliente" sin producir un warning de hidratación (a diferencia del patrón típico con useState+useEffect, que sí puede causar un parpadeo o mismatch). Combinado con lazy() y Suspense sobre el componente del mapa, el bundle de Leaflet ni siquiera se descarga hasta que hace falta.',
  },
  {
    id: 'pin-icon-cache',
    title: 'Memoización manual de íconos de Leaflet',
    filePath: 'app/components/map/PropertyMap.tsx',
    tags: ['Rendimiento'],
    code: `const pinIconCache = new Map<string, L.DivIcon>()

function buildPinIcon(pin: MapPinData) {
  const cacheKey = \`\${pin.id}-\${pin.size}-\${pin.price}\`
  const cached = pinIconCache.get(cacheKey)
  if (cached) return cached

  const dim = pin.size === 'sm' ? 34 : 44
  const labelHeight = 24
  const html = renderToStaticMarkup(<MapPin price={pin.price} size={pin.size} />)
  const icon = L.divIcon({ html, className: '', iconSize: [dim, dim * 1.2 + labelHeight], iconAnchor: [dim / 2, dim * 1.2 + labelHeight] })
  pinIconCache.set(cacheKey, icon)
  return icon
}`,
    explanation:
      'Leaflet vive fuera del árbol de React, así que useMemo no sirve para cachear estos íconos entre renders del mapa. La solución es un Map a nivel de módulo con una clave compuesta (id + tamaño + precio) que invalida el cache exactamente cuando el precio mostrado cambia, sin recalcular renderToStaticMarkup en cada pan/zoom del mapa para pines que no cambiaron. Es una optimización deliberada, no prematura: el mapa puede tener decenas de marcadores re-renderizando en cada interacción.',
  },
  {
    id: 'filter-pipeline-fallback',
    title: 'El filtrado corre igual sobre datos reales y sobre el fallback offline',
    filePath: 'app/routes/public/search.tsx',
    tags: ['Resiliencia', 'TanStack Query'],
    code: `// On error, filter the same mock dataset instead of bypassing filtering —
// keeps tab/price interactions meaningful in the offline/demo fallback too.
const sourceListings = listingsQuery.isError ? mockListings : mappedListings

const filteredListings = useMemo(
  () =>
    sourceListings.filter((item) => {
      if (!matchesOperation(item.operationType, operation)) return false
      if (priceMinValue !== null && (item.priceValue === null || item.priceValue < priceMinValue))
        return false
      if (priceMaxValue !== null && (item.priceValue === null || item.priceValue > priceMaxValue))
        return false
      return true
    }),
  [sourceListings, operation, priceMinValue, priceMaxValue],
)`,
    explanation:
      'Cuando falla la llamada a /Listings/allListingsForPublic, la UI no se queda vacía ni deshabilita los filtros: cambia la fuente de datos a un dataset mock que respeta exactamente la forma de PropertyListing (mismos campos, mismo tipo). El pipeline de filtrado (operación + rango de precio) es el mismo array de funciones puras en ambos casos, así que el modo demo no es una vista aparte con su propia lógica duplicada — es el camino feliz corriendo sobre datos distintos.',
  },
  {
    id: 'git-precommit-hook',
    title: 'Un hook de Git que bloquea el commit si el código no cumple el estándar',
    filePath: '.husky/pre-commit · package.json',
    tags: ['Git', 'Husky', 'Calidad de código'],
    code: `// .husky/pre-commit
npx lint-staged
pnpm run typecheck

// package.json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{js,jsx,json,css,md}": ["prettier --write"]
}`,
    explanation:
      'Husky engancha este script al evento pre-commit de Git, así que corre automáticamente antes de que cualquier commit se cree — nadie tiene que acordarse de ejecutarlo a mano. lint-staged es la primera línea: solo mira los archivos que quedaron en stage (git add), no el repo entero, así que es rápido incluso en un proyecto grande, y ahí mismo corrige lo que puede (ESLint --fix, Prettier --write) y re-agrega el resultado al commit. Recién después corre pnpm run typecheck sobre todo el proyecto, porque un error de tipos en un archivo puede originarse en otro que no se tocó. Si ESLint encuentra algo que no puede autocorregir o si typecheck falla, Git aborta el commit — no llega a existir en el historial. El beneficio es doble: cada commit en el historial ya pasó lint y typecheck (así que `git bisect` y code review nunca tropiezan con errores triviales), y el estilo del código queda uniforme sin que nadie tenga que pedirlo en un review. Por eso el equipo trata "bypasear con --no-verify" como el último recurso, no como una opción — saltarse el hook no arregla el problema, solo lo esconde hasta CI o hasta el siguiente que hace pull.',
  },
]
