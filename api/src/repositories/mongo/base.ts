import { MongoClient } from 'mongodb'

import { getDatabaseName, getMongoUri } from '../../common/environment'

const MONGO_URI = getMongoUri()
const DATABASE_NAME = getDatabaseName()

const client = new MongoClient(MONGO_URI)

export async function getDb() {
  await client.connect()

  return client.db(DATABASE_NAME)
}
