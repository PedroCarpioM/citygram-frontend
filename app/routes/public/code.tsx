import { useState } from 'react'
import { Footer } from '~/components/common/Footer'
import { Navbar } from '~/components/common/Navbar'
import { Button } from '~/components/common/Button'
import { SegmentedTabs } from '~/components/common/SegmentedTabs'
import { Select } from '~/components/common/Select'
import { PropertyCard } from '~/components/property/PropertyCard'
import { codeSnippets, type CodeSnippet } from './code.data'

export function meta() {
  return [
    { title: 'Código · CityGram' },
    {
      name: 'description',
      content:
        'Fragmentos reales del código de CityGram y las decisiones técnicas detrás de cada uno.',
    },
  ]
}

const STACK_HIGHLIGHTS = [
  'React Router v8 en Framework Mode, con SSR',
  'TanStack Query para estado de servidor + Zustand para estado de cliente',
  'react-hook-form + zod para formularios y validación',
  'Leaflet / react-leaflet para el mapa de propiedades',
  'Tailwind CSS v4 con un design system propio (tokens en app.css)',
]

export default function Code() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1180px] px-6 pt-10 pb-16">
        <header className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-gradient-brand px-3.5 py-1.5 text-caption font-bold uppercase tracking-wide text-white">
            Muestra de código
          </span>
          <h1 className="text-display-lg text-ink-900">
            Fragmentos reales de este repositorio<span className="text-pink-500">.</span>
          </h1>
          <ul className="flex flex-wrap gap-2.5 text-body-sm text-ink-600">
            {STACK_HIGHLIGHTS.map((item) => (
              <li key={item} className="rounded-full border border-ink-100 bg-ink-50 px-3.5 py-1.5">
                {item}
              </li>
            ))}
          </ul>
        </header>

        <DesignSystemShowcase />

        <div className="mt-14 flex flex-col gap-4">
          <h2 className="text-display-md text-ink-900">Fragmentos de código</h2>
          <div className="flex flex-col gap-8">
            {codeSnippets.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

const COLOR_GROUPS: {
  name: string
  swatches: { label: string; hex: string; className: string }[]
}[] = [
  {
    name: 'Pink',
    swatches: [
      { label: 'pink-50', hex: '#fdf1f8', className: 'bg-pink-50' },
      { label: 'pink-100', hex: '#fbdcee', className: 'bg-pink-100' },
      { label: 'pink-300', hex: '#f27fc9', className: 'bg-pink-300' },
      { label: 'pink-500', hex: '#d6009c', className: 'bg-pink-500' },
      { label: 'pink-600', hex: '#b4007f', className: 'bg-pink-600' },
      { label: 'pink-700', hex: '#8f0066', className: 'bg-pink-700' },
    ],
  },
  {
    name: 'Purple',
    swatches: [
      { label: 'purple-500', hex: '#9d0099', className: 'bg-purple-500' },
      { label: 'purple-600', hex: '#890084', className: 'bg-purple-600' },
      { label: 'purple-700', hex: '#6b0865', className: 'bg-purple-700' },
      { label: 'purple-900', hex: '#450a45', className: 'bg-purple-900' },
    ],
  },
  {
    name: 'Gold',
    swatches: [
      { label: 'gold-300', hex: '#ffe08a', className: 'bg-gold-300' },
      { label: 'gold-400', hex: '#fed966', className: 'bg-gold-400' },
      { label: 'gold-500', hex: '#f8c93f', className: 'bg-gold-500' },
    ],
  },
  {
    name: 'Ink',
    swatches: [
      { label: 'ink-900', hex: '#12111a', className: 'bg-ink-900' },
      { label: 'ink-800', hex: '#1f1e29', className: 'bg-ink-800' },
      { label: 'ink-600', hex: '#4a4855', className: 'bg-ink-600' },
      { label: 'ink-400', hex: '#7b7886', className: 'bg-ink-400' },
      { label: 'ink-200', hex: '#c9c6d1', className: 'bg-ink-200' },
      { label: 'ink-100', hex: '#e7e5ec', className: 'bg-ink-100' },
      { label: 'ink-50', hex: '#f5f4f8', className: 'bg-ink-50' },
    ],
  },
]

const TYPE_SAMPLES: { token: string; className: string; sample: string }[] = [
  {
    token: 'display-xl',
    className: 'text-display-xl font-display font-bold',
    sample: 'Encuentra tu próximo hogar',
  },
  {
    token: 'display-lg',
    className: 'text-display-lg font-display font-bold',
    sample: 'Fragmentos reales de este repositorio',
  },
  {
    token: 'display-md',
    className: 'text-display-md font-display font-bold',
    sample: 'Design system en vivo',
  },
  { token: 'title', className: 'text-title font-display font-bold', sample: 'Casa en Providencia' },
  {
    token: 'body-lg',
    className: 'text-body-lg',
    sample: 'Texto de cuerpo grande para descripciones destacadas.',
  },
  { token: 'body', className: 'text-body', sample: 'Texto de cuerpo estándar para el contenido.' },
  {
    token: 'body-sm',
    className: 'text-body-sm text-ink-600',
    sample: 'Texto secundario, metadatos y ayudas.',
  },
  {
    token: 'caption',
    className: 'text-caption font-bold uppercase tracking-wide text-ink-600',
    sample: 'Etiqueta en mayúsculas',
  },
  {
    token: 'price',
    className: 'text-price font-display font-bold text-brand-primary',
    sample: '$185.000.000',
  },
  { token: 'button', className: 'text-button font-semibold', sample: 'Ver propiedad' },
]

const SHADOW_SAMPLES = [
  { token: 'shadow-card', className: 'shadow-card' },
  { token: 'shadow-elevated', className: 'shadow-elevated' },
  { token: 'shadow-modal', className: 'shadow-modal' },
]

const RADIUS_SAMPLES = [
  { token: 'radius-sm', className: 'rounded-sm' },
  { token: 'radius-md', className: 'rounded-md' },
  { token: 'radius-lg', className: 'rounded-lg' },
]

function DesignSystemShowcase() {
  const [tab, setTab] = useState('Venta')
  const [pillTab, setPillTab] = useState('Casa')
  const [city, setCity] = useState('La Paz')

  return (
    <section className="mt-14 flex flex-col gap-10">
      <div>
        <span className="w-fit rounded-full bg-purple-500/10 px-3.5 py-1.5 text-caption font-bold uppercase tracking-wide text-purple-600">
          Design system
        </span>
        <h2 className="mt-3 text-display-md text-ink-900">Componentes y tokens en vivo</h2>
        <p className="mt-1 text-body-sm text-ink-600">
          Los mismos tokens de <span className="font-mono">app.css</span> y los componentes de{' '}
          <span className="font-mono">components/common</span> y{' '}
          <span className="font-mono">components/property</span>, renderizados de verdad — no una
          captura de pantalla.
        </p>
      </div>

      <DesignSystemPanel title="Color">
        <div className="flex flex-col gap-6">
          {COLOR_GROUPS.map((group) => (
            <div key={group.name}>
              <h4 className="text-body-sm font-bold text-ink-900">{group.name}</h4>
              <div className="mt-2.5 flex flex-wrap gap-3">
                {group.swatches.map((swatch) => (
                  <div key={swatch.label} className="flex w-24 flex-col gap-1.5">
                    <div
                      className={`h-14 w-full rounded-md border border-ink-100 ${swatch.className}`}
                    />
                    <span className="font-mono text-caption text-ink-900">{swatch.label}</span>
                    <span className="font-mono text-caption text-ink-400">{swatch.hex}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DesignSystemPanel>

      <DesignSystemPanel title="Tipografía">
        <div className="flex flex-col gap-4">
          {TYPE_SAMPLES.map((type) => (
            <div
              key={type.token}
              className="flex flex-col gap-1 border-b border-ink-100 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className={`${type.className} text-ink-900`}>{type.sample}</span>
              <span className="shrink-0 font-mono text-caption text-ink-400">
                text-{type.token}
              </span>
            </div>
          ))}
        </div>
      </DesignSystemPanel>

      <DesignSystemPanel title="Elevación y radios">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-wrap gap-6">
            {SHADOW_SAMPLES.map((shadow) => (
              <div key={shadow.token} className="flex flex-col items-center gap-2">
                <div className={`h-16 w-16 rounded-md bg-white ${shadow.className}`} />
                <span className="font-mono text-caption text-ink-400">{shadow.token}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-6">
            {RADIUS_SAMPLES.map((radius) => (
              <div key={radius.token} className="flex flex-col items-center gap-2">
                <div className={`h-16 w-16 border-2 border-purple-500 ${radius.className}`} />
                <span className="font-mono text-caption text-ink-400">{radius.token}</span>
              </div>
            ))}
          </div>
        </div>
      </DesignSystemPanel>

      <DesignSystemPanel title="Botones">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="gradient">Gradient</Button>
          <Button variant="purple">Purple</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" isLoading>
            Cargando
          </Button>
          <Button variant="primary" disabled>
            Deshabilitado
          </Button>
        </div>
      </DesignSystemPanel>

      <DesignSystemPanel title="Tabs y select">
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-caption font-bold uppercase tracking-wide text-ink-600">
              SegmentedTabs — solid
            </span>
            <div className="mt-2 max-w-sm">
              <SegmentedTabs
                options={['Venta', 'Alquiler', 'Anticrético']}
                value={tab}
                onChange={setTab}
              />
            </div>
          </div>
          <div>
            <span className="text-caption font-bold uppercase tracking-wide text-ink-600">
              SegmentedTabs — pill
            </span>
            <div className="mt-2">
              <SegmentedTabs
                options={['Casa', 'Departamento', 'Terreno', 'Oficina']}
                value={pillTab}
                onChange={setPillTab}
                variant="pill"
              />
            </div>
          </div>
          <div className="max-w-xs">
            <Select
              label="Ciudad"
              value={city}
              options={['La Paz', 'Santa Cruz', 'Cochabamba']}
              onChange={setCity}
            />
          </div>
        </div>
      </DesignSystemPanel>

      <DesignSystemPanel title="PropertyCard">
        <div className="flex flex-wrap items-start gap-8">
          <PropertyCard
            image="/images/properties/property-photo-1.jpg"
            zone="Zona Sur"
            price="4.200"
            currency="Bs/mes"
            beds={3}
            baths={2}
            garages={1}
            area={140}
          />
          <PropertyCard
            image="/images/properties/property-photo-2.jpg"
            zone="Equipetrol"
            price="620.000"
            beds={2}
            baths={1}
            compact
          />
        </div>
      </DesignSystemPanel>
    </section>
  )
}

function DesignSystemPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
      <h3 className="text-title text-ink-900">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function SnippetCard({ snippet }: { snippet: CodeSnippet }) {
  const lines = snippet.code.split('\n')

  return (
    <article className="overflow-hidden rounded-lg border border-ink-100 shadow-card">
      <div className="flex flex-col gap-2 border-b border-ink-100 bg-white p-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-title text-ink-900">{snippet.title}</h2>
          <p className="mt-0.5 font-mono text-caption text-ink-400">{snippet.filePath}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {snippet.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-purple-500/10 px-2.5 py-1 text-caption font-bold uppercase tracking-wide text-purple-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <pre className="overflow-x-auto bg-ink-900 p-0 text-[13px] leading-relaxed">
        <code className="grid font-mono text-ink-100">
          {lines.map((line, index) => (
            // Line index is a stable key here: this is static content, never reordered or edited.
            <span key={index} className="grid grid-cols-[2.5rem_1fr] px-4">
              <span className="select-none text-right text-ink-400/70">{index + 1}</span>
              <span className="pl-4 whitespace-pre">{line}</span>
            </span>
          ))}
        </code>
      </pre>

      <p className="border-t border-ink-100 bg-ink-50 p-5 text-body-sm text-ink-600">
        {snippet.explanation}
      </p>
    </article>
  )
}
