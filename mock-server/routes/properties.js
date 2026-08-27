import { randomUUID } from 'node:crypto'
import { Router } from 'express'

import { properties } from '../data/properties.js'
import { problem } from '../utils/crud.js'

export const propertiesRouter = Router()

propertiesRouter.get('/', (_req, res) => res.json(properties))

propertiesRouter.get('/:id', (req, res) => {
  const property = properties.find((p) => p.id === req.params.id)
  if (!property)
    return res.status(404).json(problem(404, 'Not Found', `Property ${req.params.id} not found`))
  res.json(property)
})

propertiesRouter.post('/', (req, res) => {
  const property = {
    ...req.body,
    id: randomUUID(),
    amenities: [],
    images: [],
    externalFeatures: [],
  }
  properties.push(property)
  res.status(201).json(property.id)
})

propertiesRouter.put('/:id', (req, res) => {
  const idx = properties.findIndex((p) => p.id === req.params.id)
  if (idx === -1)
    return res.status(404).json(problem(404, 'Not Found', `Property ${req.params.id} not found`))
  properties[idx] = { ...properties[idx], ...req.body, id: req.params.id }
  res.status(204).end()
})

propertiesRouter.delete('/:id', (req, res) => {
  const idx = properties.findIndex((p) => p.id === req.params.id)
  if (idx === -1)
    return res.status(404).json(problem(404, 'Not Found', `Property ${req.params.id} not found`))
  properties.splice(idx, 1)
  res.status(204).end()
})

function findOr404(req, res) {
  const property = properties.find((p) => p.id === req.params.id)
  if (!property) {
    res.status(404).json(problem(404, 'Not Found', `Property ${req.params.id} not found`))
    return null
  }
  return property
}

propertiesRouter.post('/:id/add-external-features', (req, res) => {
  const property = findOr404(req, res)
  if (!property) return
  property.externalFeatures = [
    ...new Set([...(property.externalFeatures ?? []), ...(req.body.ids ?? [])]),
  ]
  res.status(204).end()
})

propertiesRouter.post('/:id/remove-external-features', (req, res) => {
  const property = findOr404(req, res)
  if (!property) return
  const toRemove = new Set(req.body.ids ?? [])
  property.externalFeatures = (property.externalFeatures ?? []).filter((f) => !toRemove.has(f))
  res.status(204).end()
})

propertiesRouter.post('/:id/add-amenities', (req, res) => {
  const property = findOr404(req, res)
  if (!property) return
  property.amenities = [...new Set([...(property.amenities ?? []), ...(req.body.ids ?? [])])]
  res.status(204).end()
})

propertiesRouter.post('/:id/remove-amenities', (req, res) => {
  const property = findOr404(req, res)
  if (!property) return
  const toRemove = new Set(req.body.ids ?? [])
  property.amenities = (property.amenities ?? []).filter((a) => !toRemove.has(a))
  res.status(204).end()
})

// Multipart body isn't parsed — the mock doesn't need the actual file bytes,
// it just returns a canned image entry so the UI flow can be exercised.
propertiesRouter.post('/:id/images', (req, res) => {
  const property = findOr404(req, res)
  if (!property) return
  const image = { id: randomUUID(), url: `/images/properties/${randomUUID()}.jpeg` }
  property.images = [...(property.images ?? []), image.url]
  res.status(201).json(image)
})

propertiesRouter.delete('/:id/images/:propertyImageId', (req, res) => {
  const property = findOr404(req, res)
  if (!property) return
  property.images = (property.images ?? []).filter(
    (url) => !url.includes(req.params.propertyImageId),
  )
  res.status(204).end()
})
