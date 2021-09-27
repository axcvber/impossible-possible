import { NextApiRequest, NextApiResponse } from 'next'
import { RegisterSchema } from '../../../components/RegisterModal'
import { client, dbName } from '../../../core/db'
import { validate } from '../../../core/validate'
import { generateMD5 } from '../../../utils/generateHash'
import { sendConfirmationEmail } from '../../../utils/sendEmail'

const bcrypt = require('bcrypt')
const v4 = require('uuid').v4
const saltRounds = 10

function findUser(db: any, email: string, callback: (err: Error, user: any) => any) {
  const collection = db.collection('users')
  collection.findOne({ email }, callback)
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    client.connect(function (err: Error) {
      if (err) {
        res.status(500).send('Ошибка сервера')
      }
      console.log('Connected to MongoDB server =>')
      const db = client.db(dbName)
      const { username, email, password } = req.body

      findUser(db, email, function (err: Error, user: any) {
        if (err) {
          res.status(500).json({ error: true, message: 'Ошибка сервера' })
          return
        }
        if (!user) {
          const collection = db.collection('users')
          const confirmLink = generateMD5(process.env.SECRET_KEY + Math.random().toString() || Math.random().toString())
          bcrypt.hash(password, saltRounds, async function (err: Error, hash: string) {
            if (err) {
              res.status(500).json({ error: true, message: 'Ошибка сервера' })
              return
            }
            collection.insertOne({
              userId: v4(),
              username,
              email,
              password: hash,
              confirmLink,
              verificated: false,
            })

            await sendConfirmationEmail(username, email, password, confirmLink)

            res.status(200).json({ status: 'Пользователь успешно создан, подтвердите вашу почту!' })
            return
          })
        } else {
          res.status(409).json({ error: true, message: 'Такой email уже существует' })
          return
        }
      })
    })
  } else {
    res.status(405).send('Запрещено')
  }
}

export default validate(RegisterSchema, handler)
