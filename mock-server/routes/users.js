import { Router } from 'express'

import { users } from '../data/users.js'
import { problem } from '../utils/crud.js'

export const usersRouter = Router()

usersRouter.get('/', (_req, res) => {
  res.json(users.map(({ id, firstName, lastName, email }) => ({ id, firstName, lastName, email })))
})

// Must come before /:id so it isn't swallowed as an id param.
usersRouter.get('/admin', (_req, res) => res.json(users))

usersRouter.get('/email/:email', (req, res) => {
  const user = users.find((u) => u.email === req.params.email)
  if (!user)
    return res
      .status(404)
      .json(problem(404, 'Not Found', `User with email ${req.params.email} not found`))
  res.json(user)
})

usersRouter.get('/:id', (req, res) => {
  const user = users.find((u) => u.id === req.params.id)
  if (!user)
    return res.status(404).json(problem(404, 'Not Found', `User ${req.params.id} not found`))
  res.json(user)
})
