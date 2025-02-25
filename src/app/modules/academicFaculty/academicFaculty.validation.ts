import { z } from 'zod'

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'AcademicFaculty must be string',
    }),
  }),
})
const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'AcademicFaculty must be string',
    }),
  }),
})

export const academicFacultyuservalidation = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
}
