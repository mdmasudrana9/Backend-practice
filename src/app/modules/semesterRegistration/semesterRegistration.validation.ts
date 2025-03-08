import { z } from 'zod'
import { semesterRegistrationStatus } from './semesterRegistration.constant'

export const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...(semesterRegistrationStatus as [string, ...string[]])], {
      message: 'Invalid status',
    }),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z
      .number()
      .int()
      .positive('Minimum credit must be a positive integer'),
    maxCredit: z
      .number()
      .int()
      .positive('Maximum credit must be a positive integer'),
  }),
})

export const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid academicSemester ID')
      .optional(),
    status: z
      .enum(['UPCOMING', 'ONGOING', 'ENDED'], { message: 'Invalid status' })
      .optional(),
    startDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid start date format',
      })
      .optional(),
    endDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid end date format',
      })
      .optional(),
    minCredit: z
      .number()
      .int()
      .positive('Minimum credit must be a positive integer')
      .optional(),
    maxCredit: z
      .number()
      .int()
      .positive('Maximum credit must be a positive integer')
      .optional(),
  }),
})

export const semsterRegistrationValidations = {
  updateSemesterRegistrationValidationSchema,
  createSemesterRegistrationValidationSchema,
}
