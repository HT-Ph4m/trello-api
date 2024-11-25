import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const newCreate = async (req, res, next) => {
  try {
    const createBoard = await boardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  newCreate
}
