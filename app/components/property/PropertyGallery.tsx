import { useEffect, useState } from 'react'

const AUTO_ADVANCE_MS = 5000

interface PropertyGalleryProps {
  images: string[]
  alt: string
  className?: string
  heroClassName?: string
}

export function PropertyGallery({
  images,
  alt,
  className = '',
  heroClassName = '',
}: PropertyGalleryProps) {
  const photos = images.length > 0 ? images : ['/images/properties/property-photo-1.jpg']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (photos.length <= 1) return

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % photos.length)
    }, AUTO_ADVANCE_MS)

    return () => clearInterval(timer)
  }, [photos.length])

  const goToPrevious = () => setIndex((current) => (current - 1 + photos.length) % photos.length)
  const goToNext = () => setIndex((current) => (current + 1) % photos.length)

  return (
    <div className={className}>
      <div className="relative">
        <img
          src={photos[index]}
          alt={alt}
          className={`block w-full bg-black object-cover ${heroClassName}`}
        />
        {photos.length > 1 ? (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Foto anterior"
              className="absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Foto siguiente"
              className="absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        ) : null}
      </div>
      {photos.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 pt-2.5 sm:grid-cols-6 lg:grid-cols-[repeat(auto-fill,minmax(64px,1fr))] lg:gap-1.5">
          {photos.map((photo, i) => (
            <button
              key={photo + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === index}
              className={`aspect-square overflow-hidden rounded-md border-2 ${
                i === index ? 'border-brand-primary' : 'border-transparent'
              }`}
            >
              <img src={photo} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
