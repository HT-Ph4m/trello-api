import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from './boardRoute'

const router = express.Router()

router.get('/status', function (req, res) {
  res.status(StatusCodes.OK).json({ message: 'APIs v1 are ready to use!', code: StatusCodes.OK })
})

router.use('/boards', boardRoutes)

export const APIs_V1 = router
