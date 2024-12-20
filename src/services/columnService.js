import { StatusCodes } from 'http-status-codes'
import { cloneDeep, result } from 'lodash'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // const newCard = {
    //   ...reqBody
    // }
    const createdColumn = await columnModel.createNew(reqBody)

    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)
    if (getNewColumn) {
      getNewColumn.cards = []

      //update columnOrderIds array in collection board
      await boardModel.pushColumnOrderIds(getNewColumn)
    }
    return getNewColumn
  } catch (error) {
    throw error
  }
}

const update = async (columnId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updatedData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updatedData)
    if (!updatedColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found')
    }
    return updatedColumn
  } catch (error) {
    throw error
  }
}

const deleteItem = async (columnId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    //delete column
    await columnModel.deleteOneById(columnId)

    //delete card
    await cardModel.deleteManyByColumnId(columnId)

    return { deleteResult: 'Deleted successfully!' }
  } catch (error) {
    throw error
  }
}

const getDetails = async (columnId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const getColumn = await columnModel.getDetails(columnId)
    if (!getColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found')
    }
    const columnTransform = cloneDeep(getColumn)

    columnTransform.columns.forEach((column) => {
      column.cards = columnTransform.cards.filter((card) => card.columnId.equals(column._id))
    })
    delete columnTransform.cards
    return columnTransform
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew,
  getDetails,
  update,
  deleteItem
}
