import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import bcrypt from 'bcrypt'
import { sendEmail } from '../../utils/sendEmail'

const loginUser = async (payload: TLoginUser) => {
  // here we using findOne because find a student using customed id not mongoose id
  // check if the the user is exists
  // const isUserExits = await User.findOne({ id: payload?.id })

  // if (!isUserExits) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
  // }

  // //check the user is already deleted
  // const isDeleted = isUserExits?.isDeleted
  // if (isDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This User is Deleted!')
  // }
  // //check the user is blocked
  // const userStatus = isUserExits?.status
  // if (userStatus === 'blocked') {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This User is blocked!')
  // }
  // //check the password is currect
  // const isPasswordMatched = await bcrypt.compare(
  //   payload?.password,
  //   isUserExits?.password,
  // )

  const user = await User.isUserExistsByCustomId(payload.id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked

  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')

  //Acess Granted :send AccessToken . RefreshToken

  //Create token and send it to the user

  const JwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = jwt.sign(JwtPayload, config.jwt_secret as any, {
    //expiresIn: config.jwt_access_expiration,
    expiresIn: '1d',
  })
  const refreshToken = jwt.sign(JwtPayload, config.jwt_refresh_secret as any, {
    //expiresIn: config.jwt_refresh_expiration,
    expiresIn: '365d',
  })

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  }
}

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userData.userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked

  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  )

  return null
}

const refreshToken = async (token: string) => {
  //if the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload

  const { userId, iat } = decoded
  //if the user role is not in the required roles
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
  }

  //Create token and send it to the user

  const JwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = jwt.sign(JwtPayload, config.jwt_secret as any, {
    //expiresIn: config.jwt_access_expiration,
    expiresIn: '1d',
  })

  return {
    accessToken,
  }
}

const forgotPassword = async (userId: string) => {
  const user = await User.isUserExistsByCustomId(userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  const JwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const resetToken = jwt.sign(JwtPayload, config.jwt_secret as any, {
    //expiresIn: config.jwt_access_expiration,
    expiresIn: '10m',
  })

  const resetUILink = `${config.reset_password_ui_link}?id=${user.id}&token=${resetToken}`
  console.log(resetUILink)
  sendEmail(user.email, resetUILink)
  //return resetUILink
}

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExistsByCustomId(payload.id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload

  if (decoded.userId !== payload.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized !')
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  )

  console.log(decoded)
}
export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
}
