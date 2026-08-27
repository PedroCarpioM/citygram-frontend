import { randomUUID } from 'node:crypto'
import { Router } from 'express'

import { detailedPublicListings, ownerListings, publicListings } from '../data/listings.js'
import { problem } from '../utils/crud.js'

export const listingsRouter = Router()

// No auth required — matches the backend owner's confirmation that
// allListingsForPublic is public. No pagination either: the frontend does
// lazy loading over the full array (see docs/mock_backend.md).
listingsRouter.get('/allListingsForPublic', (_req, res) => res.json(publicListings))

// Literal path with no slash before the param, per docs/API.md.
listingsRouter.get('/listingByIdForPublic:id', (req, res) => {
  const listing = detailedPublicListings.find((l) => l.id === req.params.id)
  if (!listing)
    return res.status(404).json(problem(404, 'Not Found', `Listing ${req.params.id} not found`))
  res.json(listing)
})

// Best-effort mock: the backend owner confirmed city-based search is enough
// (no bbox/viewport search planned), so this filters by city text plus the
// other documented query params rather than doing real geo search.
listingsRouter.get('/searchProperties', (req, res) => {
  const { CityId, PropertyTypeId, ListingType, MinPrice, MaxPrice, SearchText, Page, PageSize } =
    req.query

  let results = publicListings.filter((listing) => {
    if (CityId && !listing.city?.toLowerCase().includes(String(CityId).toLowerCase())) return false
    if (PropertyTypeId && listing.propertyType !== PropertyTypeId) return false
    if (ListingType && listing.listingType !== ListingType) return false
    if (MinPrice && listing.price < Number(MinPrice)) return false
    if (MaxPrice && listing.price > Number(MaxPrice)) return false
    if (SearchText) {
      const text = String(SearchText).toLowerCase()
      const haystack =
        `${listing.title} ${listing.description} ${listing.propertyAddress}`.toLowerCase()
      if (!haystack.includes(text)) return false
    }
    return true
  })

  if (Page && PageSize) {
    const page = Number(Page)
    const pageSize = Number(PageSize)
    results = results.slice((page - 1) * pageSize, page * pageSize)
  }

  res.json(results)
})

listingsRouter.get('/user/:id', (req, res) => {
  res.json(ownerListings.filter((l) => l.userId === req.params.id))
})

listingsRouter.get('/', (_req, res) => res.json(ownerListings))

listingsRouter.get('/:id', (req, res) => {
  const listing = ownerListings.find((l) => l.id === req.params.id)
  if (!listing)
    return res.status(404).json(problem(404, 'Not Found', `Listing ${req.params.id} not found`))
  res.json(listing)
})

listingsRouter.post('/', (req, res) => {
  const listing = {
    ...req.body,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    publishedAt: req.query.PublishAt === 'true' ? new Date().toISOString() : null,
  }
  ownerListings.push(listing)
  res.status(201).json(listing.id)
})

listingsRouter.put('/:id', (req, res) => {
  const idx = ownerListings.findIndex((l) => l.id === req.params.id)
  if (idx === -1)
    return res.status(404).json(problem(404, 'Not Found', `Listing ${req.params.id} not found`))
  ownerListings[idx] = { ...ownerListings[idx], ...req.body, id: req.params.id }
  res.status(204).end()
})

listingsRouter.delete('/:id', (req, res) => {
  const idx = ownerListings.findIndex((l) => l.id === req.params.id)
  if (idx === -1)
    return res.status(404).json(problem(404, 'Not Found', `Listing ${req.params.id} not found`))
  ownerListings.splice(idx, 1)
  res.status(204).end()
})
