import type { Route } from './+types/home'
import { Button } from '~/components/common/Button'
import { Footer } from '~/components/common/Footer'
import { Navbar } from '~/components/common/Navbar'
import { SegmentedTabs } from '~/components/common/SegmentedTabs'
import { Select } from '~/components/common/Select'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'CityGram' },
    {
      name: 'description',
      content: 'Encuentra o publica inmuebles en venta, alquiler y anticrético en Bolivia.',
    },
  ]
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Footer />
      <Button variant="primary" size="lg">
        Buscar
      </Button>
      <Button variant="gradient" size="md">
        Publicar
      </Button>
      <Button variant="purple" size="sm">
        Contactar
      </Button>
      <Button variant="outline" size="md">
        Más información
      </Button>
      <Button variant="ghost" size="lg">
        Ver detalles
      </Button>

      <SegmentedTabs options={['Tab 1', 'Tab 2', 'Tab 3']} value="Hola!" onChange={() => {}} />
      <Select
        options={['Option 1', 'Option 2', 'Option 3']}
        label="Select"
        value="Option 1"
        onChange={() => {}}
      />
    </>
  )
}
