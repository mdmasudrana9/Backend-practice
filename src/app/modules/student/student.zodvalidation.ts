import { z } from 'zod'

const createuserNameZodValidationSchema = z.object({
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

const createguardianZodValidationSchema = z.object({
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

const createlocalGuardianZodValidationSchema = z.object({
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
      name: createuserNameZodValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({
          message: "Gender must be 'male', 'female', or 'other'",
        }),
      }),
      dateOfBirth: z.string().optional(),
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
      gurdian: createguardianZodValidationSchema,
      localGuardian: createlocalGuardianZodValidationSchema,
      addmissionSemester: z.string(),
      academicDepartment: z.string(),
      // profileImg: z
      //   .string()
      //   .trim()
      //   .url('Profile image must be a valid URL')
      //   .optional(),
    }),
  }),
})

const updateUserNameZodValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name cannot be more than 20 characters')
    .optional(),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .regex(/^[A-Za-z]+$/, 'Last name must contain only alphabets')
    .optional(),
})

const updateGuardianZodValidationSchema = z.object({
  fatherName: z.string().trim().optional(),
  fatherOccupation: z.string().trim().optional(),
  fatherContactNo: z.string().trim().optional(),
  motherName: z.string().trim().optional(),
  motherOccupation: z.string().trim().optional(),
  motherContactNo: z.string().trim().optional(),
})

const updateLocalGuardianZodValidationSchema = z.object({
  name: z.string().trim().optional(),
  occupation: z.string().trim().optional(),
  contactNo: z.string().trim().optional(),
  address: z.string().trim().optional(),
})

const updateStudentZodValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: updateUserNameZodValidationSchema.optional(),
        gender: z.enum(['male', 'female', 'other']).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().trim().email('Invalid email format').optional(),
        contactNo: z.string().trim().optional(),
        emergencyContactNo: z.string().trim().optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        presentAddress: z.string().trim().optional(),
        permanentAddress: z.string().trim().optional(),
        gurdian: updateGuardianZodValidationSchema.optional(),
        localGuardian: updateLocalGuardianZodValidationSchema.optional(),
        addmissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
        profileImg: z
          .string()
          .trim()
          .url('Profile image must be a valid URL')
          .optional(),
      })
      .optional(),
  }),
})

export const studentZodValidations = {
  createStudentZodValidationSchema,
  updateStudentZodValidationSchema,
}
