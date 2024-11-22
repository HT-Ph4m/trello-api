/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
const START_SERVER = () => {
  const app = express()
  const hostname = env.APP_HOST
  const port = env.APP_PORT

  app.get('/', async (req, res) => {
    res.end('<h1>Hello world!</h1>')
  })

  app.listen(port, hostname, () => {
    console.log(`Hi ${env.AUTH}. I am running at ${hostname}:${port}/`)
  })

  exitHook(() => {
    CLOSE_DB()
  })
}

;(async () => {
  try {
    await CONNECT_DB()
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Connect to mongodb successfully'))
//   .then(() => {
//     START_SERVER()
//   })
//   .catch((err) => {
//     console.error(err)
//     process.exit(0)
//   })
