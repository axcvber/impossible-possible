import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { LoginSchema } from '../../components/AuthModal'
import { client, dbName } from '../../core/db'
import { validate } from '../../core/validate'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function findUser(db: any, email: string, callback: (err: Error, match: boolean) => any) {
  const collection = db.collection('users')
  collection.findOne({ email }, callback)
}

function authUser(password: string, hashPassword: string, callback: (err: Error, match: boolean) => any) {
  bcrypt.compare(password, hashPassword, callback)
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    client.connect(function (err: Error) {
      if (err) {
        res.status(500).json({ error: true, message: 'Ошибка сервера' })
      }
      console.log('Connected to MongoDB server =>')
      const db = client.db(dbName)
      const { email, password } = req.body

      findUser(db, email, function (err: Error, user: any) {
        if (err) {
          res.status(500).json({ error: true, message: 'Ошибка сервера' })
          return
        }
        if (!user) {
          res.status(404).json({ error: true, message: 'Неверные данные' })
          return
        } else {
          authUser(password, user.password, function (err: Error, match: boolean) {
            if (err) {
              res.status(500).json({ error: true, message: 'Ошибка авторизации' })
              return
            }
            if (match) {
              if (!user.verificated) {
                res.status(401).json({ error: true, message: 'Подтвердите вашу почту' })
                return
              } else {
                const token = jwt.sign(
                  { userId: user.userId, username: user.username, email: user.email },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: '30 days',
                  }
                )
                res.setHeader('Set-Cookie', serialize('token', token, { path: '/' }))
                res.status(200).json({ status: 'Авторизация выполнена успешно!' })
                return
              }
            } else {
              res.status(404).json({ error: true, message: 'Неверные данные' })
              return
            }
          })
        }
      })
    })
  } else {
    res.status(405).send('Запрещено')
  }
}

export default validate(LoginSchema, handler)
