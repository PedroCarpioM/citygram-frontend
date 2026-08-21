const FOOTER_COLUMNS = [
  {
    title: 'Sobre CityGram',
    links: ['Quiénes somos', 'Sala de prensa', 'Trabaja con nosotros'],
  },
  {
    title: 'Ayuda',
    links: [
      'Preguntas frecuentes',
      'Seguridad online',
      'Contacta con CityGram',
      'Política de privacidad',
    ],
  },
  {
    title: 'Ciudades',
    links: ['La Paz', 'Cochabamba', 'Santa Cruz', 'Sucre'],
  },
]

const SOCIAL_LINKS = [
  { label: 'Facebook', glyph: 'f' },
  { label: 'YouTube', glyph: 'yt' },
  { label: 'Instagram', glyph: 'ig' },
]

export function Footer() {
  return (
    // TODO: Replace social links with actual social links
    <footer className="mt-14 bg-ink-50 px-6 pt-12 pb-8">
      <div className="mx-auto max-w-[1180px]">
        <img src="/images/brand/isologo.jpg" alt="CityGram" className="mb-8 h-8.5" />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(160px,100%),1fr))] gap-8">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-2.5">
              <div className="text-body font-bold text-ink-900">{column.title}</div>
              {column.links.map((link) => (
                <a key={link} href="#" className="text-body-sm">
                  {link}
                </a>
              ))}
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <div className="text-body font-bold text-ink-900">En tu móvil</div>
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
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-200 text-caption font-semibold text-ink-900 transition-colors duration-fast hover:bg-pink-500 hover:text-white hover:no-underline"
                >
                  {social.glyph}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-body-sm text-ink-400">CityGram Copyright © 2020–2026</div>
      </div>
    </footer>
  )
}
