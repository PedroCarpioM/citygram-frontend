import cors from 'cors'
import express from 'express'

import {
  cities,
  countries,
  externalFeatures,
  neighborhoods,
  propertyTypes,
  provinces,
  roles,
} from './data/locations.js'
import { authRouter } from './routes/auth.js'
import { listingsRouter } from './routes/listings.js'
import { propertiesRouter } from './routes/properties.js'
import { usersRouter } from './routes/users.js'
import { createCrudRouter } from './utils/crud.js'

const PORT = process.env.MOCK_PORT ?? 3000

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/Users', usersRouter)
app.use('/api/Properties', propertiesRouter)
app.use('/api/Listings', listingsRouter)

app.use('/api/Countries', createCrudRouter('Country', countries))
app.use('/api/Provinces', createCrudRouter('Province', provinces))
app.use('/api/Cities', createCrudRouter('City', cities))
app.use('/api/Neighborhoods', createCrudRouter('Neighborhood', neighborhoods))
app.use('/api/PropertyTypes', createCrudRouter('PropertyType', propertyTypes))
app.use('/api/ExternalFeatures', createCrudRouter('ExternalFeature', externalFeatures))
app.use('/api/Roles', createCrudRouter('Role', roles))

app.listen(PORT, () => {
  console.log(`[mock-backend] listening on http://localhost:${PORT}/api`)
})
