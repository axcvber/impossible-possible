import { NextApiRequest, NextApiResponse } from 'next'
const jwt = require('jsonwebtoken')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (!('token' in req.cookies)) {
      res.status(401).json({ error: true, message: 'Ошибка авторизации' })
      return
    }
    let decoded
    const token = req.cookies.token
    if (token) {
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
      } catch (e) {
        console.error(e)
      }
    }

    if (decoded) {
      res.status(200).json({ decoded })
      return
    } else {
      res.status(401).json({ message: 'Ошибка авторизации' })
    }
  }
}
