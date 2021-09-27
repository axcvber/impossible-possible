import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

export function validate(schema: OptionalObjectSchema<ObjectShape>, handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(400).json({ error: true, message: 'Некорректные поля ввода' })
    }
    await handler(req, res)
  }
}
