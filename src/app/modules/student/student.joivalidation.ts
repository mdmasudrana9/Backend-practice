import Joi from 'joi'

const userNameJoiSchema = Joi.object({
  firstName: Joi.string().trim().max(20).required().messages({
    'string.empty': 'First name is required',
    'string.max': 'First name cannot be more than 20 characters',
  }),
  middleName: Joi.string().trim().allow(''), // Optional
  lastName: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+$/)
    .required()
    .messages({
      'string.empty': 'Last name is required',
      'string.pattern.base': '{#value} is not a valid last name',
    }),
})

const guardianJoiSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.empty': 'Father name is required',
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.empty': 'Father occupation is required',
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'string.empty': 'Father contact number is required',
  }),
  motherName: Joi.string().trim().required().messages({
    'string.empty': 'Mother name is required',
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.empty': 'Mother occupation is required',
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'string.empty': 'Mother contact number is required',
  }),
})

const localGuardianJoiSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian name is required',
  }),
  occupation: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian occupation is required',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian contact number is required',
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian address is required',
  }),
})

const joiValidationStudentSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'string.empty': 'Student ID is required',
  }),
  name: userNameJoiSchema.required().messages({
    'any.required': 'Student name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': "Gender must be either 'male', 'female', or 'other'",
    'string.empty': 'Gender is required',
  }),
  dateOfBirth: Joi.string().trim().optional(),
  email: Joi.string().trim().email().required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only':
        "Blood group must be one of 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', or 'O-'",
    }),
  presentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Permanent address is required',
  }),
  gurdian: guardianJoiSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: localGuardianJoiSchema.required().messages({
    'any.required': 'Local guardian information is required',
  }),
  profileImg: Joi.string().trim().uri().required().messages({
    'string.uri': 'Profile image must be a valid URL',
    'string.empty': 'Profile image is required',
  }),
  isActive: Joi.string()
    .valid('active', 'inactive')
    .default('active')
    .messages({
      'any.only': "Status must be either 'active' or 'inactive'",
    }),
})

export default joiValidationStudentSchema
