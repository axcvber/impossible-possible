import type { NextApiRequest, NextApiResponse } from 'next'
import { client, dbName } from '../../core/db'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    client.connect(async function (err: Error) {
      if (err) {
        res.status(500).send('Ошибка сервера')
      }
      console.log('Connected to MongoDB server =>')
      const db = client.db(dbName)
      const collection = db.collection('reviews')
      collection
        .find()
        .sort({ _id: -1 })
        .limit(20)
        .toArray((err: Error, result: any) => {
          if (err) throw err
          res.status(200).json(result)
          client.close()
        })
    })
  } else {
    res.status(405).send('Запрещено')
  }
}

export default handler
