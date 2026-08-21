import { ImagePlus, QrCode, Smartphone } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

import type { Route } from './+types/home'
import { Button } from '~/components/common/Button'
import { Footer } from '~/components/common/Footer'
import { Navbar } from '~/components/common/Navbar'
import { SegmentedTabs } from '~/components/common/SegmentedTabs'
import { Select } from '~/components/common/Select'
import { useCities } from '~/hooks/useCities'
import { useNeighborhoods } from '~/hooks/useNeighborhoods'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'CityGram' },
    {
      name: 'description',
      content: 'Encuentra o publica inmuebles en venta, alquiler y anticrético en Bolivia.',
    },
  ]
}

const OPERATION_OPTIONS = ['Venta', 'Alquiler', 'Anticrético']
const FALLBACK_CITY_OPTIONS = ['La Paz', 'Cochabamba', 'Santa Cruz', 'Sucre']
const FALLBACK_ZONA_OPTIONS = ['Cala-Cala', 'Equipetrol', 'Sopocachi']
const NEWS_TABS = ['Destacadas', 'Inmobiliario', 'Finanzas', 'Vacacional', 'Deco']

const NEWS_ITEMS = [
  {
    image: '/images/home/news-1-placeholder.jpg',
    title: 'Se vende una casa colonial del siglo XIX con patios internos y vista a las montañas',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
  },
  {
    image: '/images/home/news-2-placeholder.jpg',
    title:
      'Flex living: "no es una moda pasajera, es parte de una transformación del mercado residencial"',
    excerpt:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
  },
  {
    image: '/images/home/news-3-placeholder.jpg',
    title:
      'El casco histórico de Sucre, la joya colonial que entendió la arquitectura como patrimonio',
    excerpt:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
]

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchPanel />
      <PromoGrid />
      <AppPromo />
      <NewsSection />
      <Footer />
    </>
  )
}

function Hero() {
  return (
    <div className="flex flex-col">
      <div className="order-2 bg-white px-[clamp(1.25rem,4vw,2.5rem)] pt-8 pb-6 text-center sm:order-1">
        <p className="mx-auto max-w-[1180px] font-display text-[clamp(1.375rem,3vw,2rem)] font-light text-ink-900">
          Encuentra el inmueble que <span className="font-extrabold">estás buscando</span>
          <span className="font-extrabold text-pink-500">.</span>
        </p>
      </div>
      <div className="order-1 sm:order-2">
        <img
          src="/images/home/property-photo-1.jpg"
          alt="Vivienda"
          className="block h-[clamp(320px,21vw,560px)] w-full object-cover"
        />
      </div>
    </div>
  )
}

function SearchPanel() {
  const [operation, setOperation] = useState(OPERATION_OPTIONS[1])
  const [ciudad, setCiudad] = useState(FALLBACK_CITY_OPTIONS[1])
  const [zona, setZona] = useState(FALLBACK_ZONA_OPTIONS[0])

  const citiesQuery = useCities()
  const neighborhoodsQuery = useNeighborhoods()

  const cityOptions = useMemo(
    () =>
      citiesQuery.isError
        ? FALLBACK_CITY_OPTIONS
        : (citiesQuery.data ?? [])
            .map((city) => city.name)
            .filter((name): name is string => Boolean(name)),
    [citiesQuery.data, citiesQuery.isError],
  )

  const zonaOptions = useMemo(
    () =>
      neighborhoodsQuery.isError
        ? FALLBACK_ZONA_OPTIONS
        : (neighborhoodsQuery.data ?? [])
            .filter((neighborhood) => neighborhood.cityName === ciudad)
            .map((neighborhood) => neighborhood.name)
            .filter((name): name is string => Boolean(name)),
    [neighborhoodsQuery.data, neighborhoodsQuery.isError, ciudad],
  )

  useEffect(() => {
    if (citiesQuery.isError) {
      toast.error('No se pudo conectar con el servidor. Mostrando ciudades de ejemplo.')
    }
  }, [citiesQuery.isError])

  useEffect(() => {
    if (neighborhoodsQuery.isError) {
      toast.error('No se pudo conectar con el servidor. Mostrando zonas de ejemplo.')
    }
  }, [neighborhoodsQuery.isError])

  // Adjusting state during render (not in an effect) keeps a stale selection from
  // ever painting when the options list changes — see https://react.dev/learn/you-might-not-need-an-effect
  const [prevCityOptions, setPrevCityOptions] = useState(cityOptions)
  if (cityOptions !== prevCityOptions) {
    setPrevCityOptions(cityOptions)
    if (cityOptions.length > 0 && !cityOptions.includes(ciudad)) {
      setCiudad(cityOptions[0])
    }
  }

  const [prevZonaOptions, setPrevZonaOptions] = useState(zonaOptions)
  if (zonaOptions !== prevZonaOptions) {
    setPrevZonaOptions(zonaOptions)
    if (zonaOptions.length > 0 && !zonaOptions.includes(zona)) {
      setZona(zonaOptions[0])
    }
  }

  return (
    <div className="relative z-[2] mx-auto mt-5 flex max-w-[1180px] flex-col gap-5 px-6 sm:-mt-18 sm:gap-0">
      <div className="relative z-[3] pl-5 sm:hidden">
        <SegmentedTabs options={OPERATION_OPTIONS} value={operation} onChange={setOperation} />
      </div>

      <div className="-mt-px flex flex-col gap-5 rounded-lg bg-gradient-brand p-[clamp(1.25rem,4vw,2.5rem)] shadow-elevated">
        <div className="flex flex-wrap items-end gap-3.5">
          <div className="hidden min-w-0 sm:block">
            <SegmentedTabs options={OPERATION_OPTIONS} value={operation} onChange={setOperation} />
          </div>

          <div className="flex flex-1 flex-wrap gap-3.5">
            <div className="min-w-[180px] flex-1">
              <Select
                label="Ciudad"
                value={ciudad}
                options={cityOptions}
                onChange={setCiudad}
                disabled={citiesQuery.isLoading}
                gradientLabel
              />
            </div>
            <div className="min-w-[180px] flex-1">
              <Select
                label="Zona"
                value={zona}
                options={zonaOptions}
                onChange={setZona}
                disabled={neighborhoodsQuery.isLoading}
                gradientLabel
              />
            </div>
          </div>

          <div className="hidden sm:block">
            <Button variant="primary" size="lg">
              Buscar
            </Button>
          </div>
        </div>
      </div>

      <Button variant="primary" size="lg" className="w-full sm:hidden">
        Buscar
      </Button>
    </div>
  )
}

function PromoGrid() {
  return (
    <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6 px-6 pt-14 pb-6">
      <a
        href="#"
        className="group flex flex-col items-start gap-5 rounded-lg border border-ink-100 p-5 shadow-card transition-shadow duration-base hover:shadow-elevated hover:no-underline sm:flex-row"
      >
        <img
          src="/images/home/map-placeholder.jpg"
          alt="Mapa de zonas"
          className="h-[180px] w-full shrink-0 rounded-md object-cover sm:h-[110px] sm:w-[140px]"
        />
        <div className="flex flex-col gap-1.5">
          <div className="text-title text-ink-900">Selecciona zonas en el mapa</div>
          <div className="text-body-sm text-ink-600">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
            velit...
          </div>
          <span className="text-body-sm font-semibold text-purple-600 group-hover:text-pink-600">
            Empezar
          </span>
        </div>
      </a>

      <a
        href="#"
        className="group flex flex-col items-start gap-5 rounded-lg border border-ink-100 p-5 shadow-card transition-shadow duration-base hover:shadow-elevated hover:no-underline sm:flex-row"
      >
        <div className="flex h-[180px] w-full shrink-0 items-center justify-center rounded-md bg-ink-50 sm:h-[110px] sm:w-[140px]">
          <ImagePlus aria-hidden size={28} className="text-ink-400" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="text-title text-ink-900">Publica tu inmueble gratis</div>
          <div className="text-body-sm text-ink-600">
            Donec egestas vulputate sapien, eu eleifend mauris scelerisque et.
          </div>
          <span className="text-body-sm font-semibold text-purple-600 group-hover:text-pink-600">
            Anuncia gratis
          </span>
        </div>
      </a>
    </div>
  )
}

function AppPromo() {
  return (
    <div className="mx-auto flex max-w-[1180px] flex-col items-stretch gap-6 px-6 md:flex-row">
      <div className="flex min-h-[220px] flex-col items-center justify-center rounded-lg bg-ink-50 md:flex-[2]">
        <Smartphone aria-hidden size={40} className="text-ink-400" />
      </div>
      <div className="flex flex-col justify-center gap-3.5 rounded-lg border border-ink-100 p-7 shadow-card md:flex-1">
        <div className="text-display-md text-ink-900">Lleva CityGram siempre contigo</div>
        <div className="text-body text-ink-600">
          Proin pellentesque, felis ac gravida semper, neque massa accumsan massa, venenatis porta
          justo nisi et sapien.
        </div>
        <div className="mt-2.5 flex items-center gap-4">
          <div className="flex h-22 w-22 shrink-0 items-center justify-center rounded-md bg-ink-50">
            <QrCode aria-hidden size={32} className="text-ink-400" />
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="#"
              className="w-fit rounded-md border-2 border-ink-200 px-3.5 py-2 text-body-sm font-semibold text-ink-900 transition-colors duration-fast hover:border-pink-500 hover:text-pink-600 hover:no-underline"
            >
              App Store
            </a>
            <a
              href="#"
              className="w-fit rounded-md border-2 border-ink-200 px-3.5 py-2 text-body-sm font-semibold text-ink-900 transition-colors duration-fast hover:border-pink-500 hover:text-pink-600 hover:no-underline"
            >
              Google Play
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function NewsSection() {
  const [activeTab, setActiveTab] = useState(NEWS_TABS[0])

  return (
    <div className="mx-auto max-w-[1180px] px-6 pt-16 pb-6">
      <div className="text-display-lg text-ink-900">
        CityGram<span className="text-pink-500">/</span>noticias
      </div>
      <div className="mt-2 text-body text-ink-600">
        Quisque fringilla, ipsum sed aliquet viverra, purus lacus laoreet metus aliquam.
      </div>

      <div className="mt-6">
        <SegmentedTabs
          options={NEWS_TABS}
          value={activeTab}
          onChange={setActiveTab}
          variant="pill"
        />
      </div>

      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
        {NEWS_ITEMS.map((item) => (
          <a key={item.title} href="#" className="group flex flex-col gap-2.5 hover:no-underline">
            <div className="overflow-hidden rounded-md">
              <img
                src={item.image}
                alt=""
                className="h-[170px] w-full object-cover transition-transform duration-base group-hover:scale-105"
              />
            </div>
            <div className="text-body font-semibold text-ink-900">{item.title}</div>
            <div className="text-body-sm text-ink-600">{item.excerpt}</div>
            <span className="text-body-sm font-semibold text-purple-600 group-hover:text-pink-600">
              Leer más
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
