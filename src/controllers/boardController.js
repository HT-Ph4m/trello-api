import { StatusCodes } from 'http-status-codes'
const newCreate = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json({ message: 'New board created successfully!' })
    // next()
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ errors: new Error(error).message })
  }
}

export const boardController = {
  newCreate
}
