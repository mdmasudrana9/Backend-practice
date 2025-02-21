import { z } from 'zod'

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'password must be string',
    })
    .max(20, { message: 'password can not be 20 charectre' })
    .optional(),
})

export const uservalidation = {
  userValidationSchema,
}
