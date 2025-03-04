import { TGenericErrorResponse } from '../interface/error'

const handleDublicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/)

  const extractedMessage = match && match[1]

  const errorSources = [
    { path: '', message: `${extractedMessage} is allready Exists` },
  ]
  const statusCode = 400
  return {
    statusCode,
    message: 'validation error',
    errorSources,
  }
}
export default handleDublicateError
