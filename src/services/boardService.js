import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createdBoard = await boardModel.createNew(newBoard)

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    return getNewBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const getBoard = await boardModel.getDetails(boardId)
    if (!getBoard) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }
    const boardTransform = cloneDeep(getBoard)

    boardTransform.columns.forEach((column) => {
      column.cards = boardTransform.cards.filter((card) => card.columnId.equals(column._id))
    })
    delete boardTransform.cards
    return boardTransform
  } catch (error) {
    throw error
  }
}

const update = async (boardId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updatedData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updatedData)
    if (!updatedBoard) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }
    return updatedBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails,
  update
}
