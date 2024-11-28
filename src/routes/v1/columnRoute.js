import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { columnController } from '~/controllers/columnController'
import { columnValidation } from '~/validations/columnValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Columns API is ready to use!' })
  })
  .post(columnValidation.createNew, columnController.newCreate)

Router.route('/:id').get(columnController.getDetails).put().delete()
export const columnRoutes = Router
