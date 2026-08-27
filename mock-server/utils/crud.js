import { randomUUID } from 'node:crypto'
import { Router } from 'express'

export function problem(status, title, detail) {
  return {
    type: `https://httpstatuses.com/${status}`,
    title,
    status,
    detail,
  }
}

/**
 * Generic in-memory CRUD router for the plain resources in docs/API.md
 * (Countries, Provinces, Cities, Neighborhoods, ExternalFeatures, PropertyTypes, Roles).
 */
export function createCrudRouter(resourceName, seed) {
  const router = Router()
  const items = [...seed]

  router.get('/', (_req, res) => res.json(items))

  router.get('/:id', (req, res) => {
    const item = items.find((i) => i.id === req.params.id)
    if (!item) {
      return res
        .status(404)
        .json(problem(404, 'Not Found', `${resourceName} ${req.params.id} not found`))
    }
    res.json(item)
  })

  router.post('/', (req, res) => {
    const item = { ...req.body, id: randomUUID() }
    items.push(item)
    res.status(201).json(item.id)
  })

  router.put('/:id', (req, res) => {
    const idx = items.findIndex((i) => i.id === req.params.id)
    if (idx === -1) {
      return res
        .status(404)
        .json(problem(404, 'Not Found', `${resourceName} ${req.params.id} not found`))
    }
    items[idx] = { ...items[idx], ...req.body, id: req.params.id }
    res.status(204).end()
  })

  router.delete('/:id', (req, res) => {
    const idx = items.findIndex((i) => i.id === req.params.id)
    if (idx === -1) {
      return res
        .status(404)
        .json(problem(404, 'Not Found', `${resourceName} ${req.params.id} not found`))
    }
    items.splice(idx, 1)
    res.status(204).end()
  })

  return router
}
