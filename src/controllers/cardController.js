import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

const newCreate = async (req, res, next) => {
  try {
    const createCard = await cardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createCard)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const cardId = req.params.id
    const card = await cardService.getDetails(cardId)
    res.status(StatusCodes.OK).json(card)
  } catch (error) {
    next(error)
  }
}

export const cardController = {
  newCreate,
  getDetails
}
