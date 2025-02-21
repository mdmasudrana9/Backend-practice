import { Response } from 'express'

type TResponse<T> = {
  statusCode: number
  success: boolean
  message: string
  data?: T
}

const sendResponse = <T>(res: Response, data?: TResponse<T>) => {
  res.status(data?.statusCode || 500).json({
    success: data?.success || false,
    message: data?.message || 'An error occurred',
    data: data?.data || null,
  })
}

export default sendResponse
