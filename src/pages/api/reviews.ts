import { NextApiRequest, NextApiResponse } from 'next'
import { client, dbName } from '../../core/db'
import { validate } from '../../core/validate'
import { ReviewsSchema } from '../../sections/Reviews'
const jwt = require('jsonwebtoken')

function findReview(db: any, email: string, callback: any) {
  const collection = db.collection('reviews')
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
      const review = req.body.review
      const trimStr = review.replace(/\s\s+/g, ' ')
      const token = req.cookies.token
      if (token) {
        try {
          const { username, email } = jwt.verify(token, process.env.JWT_SECRET)

          findReview(db, email, function (err: Error, userReview: any) {
            if (err) {
              res.status(500).json({ error: true, message: 'Ошибка сервера' })
              return
            }
            if (userReview) {
              res.status(409).json({ error: true, message: 'Вы уже оставили свой отзыв' })
            } else {
              const collection = db.collection('reviews')
              collection.insertOne({
                username,
                email,
                review: trimStr,
              })
              res.status(200).json({ status: 'Отзыв успешно отправлен' })
              return
            }
          })
        } catch (e) {
          res.status(500).send('Ошибка сервера')
          console.error(e)
        }
      } else {
        res.status(401).json({ error: true, message: 'Ошибка авторизации' })
        return
      }
    })
  } else {
    res.status(405).send('Запрещено')
  }
}

export default validate(ReviewsSchema, handler)
