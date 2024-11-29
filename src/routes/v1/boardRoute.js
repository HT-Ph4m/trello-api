import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardController } from '~/controllers/boardController'
import { boardValidation } from '~/validations/boardValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Boards API is ready to use!' })
  })
  .post(boardValidation.createNew, boardController.newCreate)

Router.route('/:id').get(boardController.getDetails).put(boardValidation.update, boardController.update).delete()
export const boardRoutes = Router
