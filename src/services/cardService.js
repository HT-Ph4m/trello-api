import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // const newCard = {
    //   ...reqBody
    // }
    const createdCard = await cardModel.createNew(reqBody)

    const getNewCard = await cardModel.findOneById(createdCard.insertedId)
    if (getNewCard) {
      //update cardOrderIds array in collection board
      await columnModel.pushCardOrderIds(getNewCard)
    }
    return getNewCard
  } catch (error) {
    throw error
  }
}

const getDetails = async (cardId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const getCard = await cardModel.getDetails(cardId)
    if (!getCard) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Card not found')
    }
    const cardTransform = cloneDeep(getCard)

    cardTransform.columns.forEach((column) => {
      column.cards = cardTransform.cards.filter((card) => card.columnId.equals(column._id))
    })
    delete cardTransform.cards
    return cardTransform
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew,
  getDetails
}
