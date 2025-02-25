import { z } from 'zod'

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'AcademicDepartment must be string',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'AcademicFaculty Mustbe String',
      required_error: 'Faculty is required',
    }),
  }),
})
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'AcademicDepartment must be string',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'AcademicFaculty Mustbe String',
        required_error: 'Faculty is required',
      })
      .optional(),
  }),
})

export const academicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
}
