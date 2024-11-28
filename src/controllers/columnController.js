import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const newCreate = async (req, res, next) => {
  try {
    const createColumn = await columnService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createColumn)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const columnId = req.params.id
    const column = await columnService.getDetails(columnId)
    res.status(StatusCodes.OK).json(column)
  } catch (error) {
    next(error)
  }
}

export const columnController = {
  newCreate,
  getDetails
}