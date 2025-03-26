import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { AuthService } from './auth.service'

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body)
  //set refreshToken in cokkie
  const { refreshToken, accessToken, needsPasswordChange } = result

  res.cookie('refreshToken', refreshToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
      needsPasswordChange,
    },
  })
})
const changePassword = catchAsync(async (req, res) => {
  const user = req.user
  const { ...passWordData } = req.body
  const result = await AuthService.changePassword(req.user, passWordData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated  successfully!',
    data: result,
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await AuthService.refreshToken(refreshToken)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh-token is retrived successfully!',
    data: result,
  })
})

const forgotPassword = catchAsync(async (req, res) => {
  const userId = req.body.id
  const result = await AuthService.forgotPassword(userId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated successfully!',
    data: result,
  })
})
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization
  const result = await AuthService.resetPassword(req.body, token)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset  successfully!',
    data: result,
  })
})

export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
}
