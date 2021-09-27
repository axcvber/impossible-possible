const MongoClient = require('mongodb').MongoClient

export const dbName = process.env.DB_NAME
const url = process.env.DB_URL

export const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

client.close()
