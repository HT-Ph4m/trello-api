/* eslint-disable no-console */
//hongtruongpham18
//Tn0LB8tfi1WU4PRz
//npm install mongodb
//mongodb+srv://hongtruongpham18:Tn0LB8tfi1WU4PRz@cluster0-devphamtruong.tx5o5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-devphamtruong
import { env } from '~/config/environment'
const MONGODB_URI = env.MONGODB_URI
const DATABASE_NAME = env.DATABASE_NAME

import { MongoClient, ServerApiVersion } from 'mongodb'

let trelloDatabaseInstance = null

const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// connect to database
export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Database is not connected')
  return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.c
}
