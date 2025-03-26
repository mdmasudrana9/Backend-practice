import { z } from 'zod'

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
})

const changePassWordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old Password is required.' }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
})

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh Token is required.' }),
  }),
})

const forgotPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required.' }),
  }),
})
const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required.' }),
    newPassword: z.string({ required_error: 'User Password is required.' }),
  }),
})

export const AuthValidation = {
  loginValidationSchema,
  changePassWordValidationSchema,
  refreshTokenValidationSchema,
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
}
