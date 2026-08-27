import { Router } from 'express'

import { users } from '../data/users.js'

function base64url(obj) {
  return Buffer.from(JSON.stringify(obj)).toString('base64url')
}

function fakeAccessToken(user) {
  const header = base64url({ alg: 'none', typ: 'JWT' })
  const payload = base64url({
    sub: user.id,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  })
  return `${header}.${payload}.mock-signature`
}

export const authRouter = Router()

// Accepts any GoogleLoginRequest body — no real Google token verification.
authRouter.post('/google', (_req, res) => {
  const user = users[0]
  res.json({
    userId: user.id,
    accessToken: fakeAccessToken(user),
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  })
})
