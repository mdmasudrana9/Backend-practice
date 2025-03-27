import { z } from 'zod'
import { userStatus } from './user.constant'

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'password must be string',
    })
    .max(20, { message: 'password can not be 20 charectre' })
    .optional(),
})
const changeStatususerValidationSchema = z.object({
  body: z.object({
    status: z.enum([...userStatus] as [string, ...string[]]),
  }),
})

export const uservalidation = {
  userValidationSchema,
  changeStatususerValidationSchema,
}
