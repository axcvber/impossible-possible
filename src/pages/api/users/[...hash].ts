import { NextApiRequest, NextApiResponse } from 'next'
import { client, dbName } from '../../../core/db'
import { serialize } from 'cookie'
const jwt = require('jsonwebtoken')

function findUser(db: any, confirmLink: any, callback: any) {
  const collection = db.collection('users')
  collection.findOne({ confirmLink }, callback)
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    client.connect(function (err: Error) {
      if (err) {
        res.status(500).send('Ошибка сервера')
      }
      console.log('Connected to MongoDB server =>')
      const db = client.db(dbName)
      const hash = req.query.hash[1]

      findUser(db, hash, function (err: Error, user: any) {
        if (err) {
          res.status(500).json({ error: true, message: 'Ошибка сервера' })
          return
        }
        if (hash) {
          console.log(hash, user)
          db.collection('users').updateOne(
            { confirmLink: hash },
            {
              $set: { verificated: true },
            }
          )
          const token = jwt.sign(
            { userId: user.userId, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            {
              expiresIn: '30 days',
            }
          )
          res.setHeader('Set-Cookie', serialize('token', token, { path: '/' }))
          res.redirect(307, `/activate/${hash}`)
          res.end()
          return
        } else {
          res.status(404)
          return
        }
      })
    })
  }
}
