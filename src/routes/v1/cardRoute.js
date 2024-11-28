import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { cardController } from '~/controllers/cardController'
import { cardValidation } from '~/validations/cardValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Cards API is ready to use!' })
  })
  .post(cardValidation.createNew, cardController.newCreate)

Router.route('/:id').get(cardController.getDetails).put().delete()
export const cardRoutes = Router
