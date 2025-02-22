import { z } from 'zod'

const userNameZodValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name cannot be more than 20 characters')
    .min(1, 'First name is required'),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .regex(/^[A-Za-z]+$/, 'Last name must contain only alphabets')
    .min(1, 'Last name is required'),
})

const guardianZodValidationSchema = z.object({
  fatherName: z.string().trim().min(1, 'Father name is required'),
  fatherOccupation: z.string().trim().min(1, 'Father occupation is required'),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, 'Father contact number is required'),
  motherName: z.string().trim().min(1, 'Mother name is required'),
  motherOccupation: z.string().trim().min(1, 'Mother occupation is required'),
  motherContactNo: z
    .string()
    .trim()
    .min(1, 'Mother contact number is required'),
})

const localGuardianZodValidationSchema = z.object({
  name: z.string().trim().min(1, 'Local guardian name is required'),
  occupation: z.string().trim().min(1, 'Local guardian occupation is required'),
  contactNo: z
    .string()
    .trim()
    .min(1, 'Local guardian contact number is required'),
  address: z.string().trim().min(1, 'Local guardian address is required'),
})

const createStudentZodValidationSchema = z.object({
  body: z.object({
    password: z.string().trim().min(1, 'Password is required'),
    student: z.object({
      name: userNameZodValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({
          message: "Gender must be 'male', 'female', or 'other'",
        }),
      }),
      dateOfBirth: z.date().optional(),
      email: z.string().trim().email('Invalid email format'),
      contactNo: z.string().trim().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .trim()
        .min(1, 'Emergency contact number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().trim().min(1, 'Present address is required'),
      permanentAddress: z
        .string()
        .trim()
        .min(1, 'Permanent address is required'),
      gurdian: guardianZodValidationSchema,
      localGuardian: localGuardianZodValidationSchema,
      profileImg: z
        .string()
        .trim()
        .url('Profile image must be a valid URL')
        .optional(),
    }),
  }),
})

export const studentZodValidations = {
  createStudentZodValidationSchema,
}
