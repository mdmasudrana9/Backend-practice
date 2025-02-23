import { model, Schema } from 'mongoose'
import {
  TGuardian,
  TLocalGuardian, // Fixed typo
  TStudent,
  StudentModel,
  TuserName,
} from './student.interface'
import validator from 'validator'

const userNameSchema = new Schema<TuserName>({
  firstName: {
    type: String,
    //built-in validator
    trim: true,
    required: [true, 'First name is required'],
    maxlength: [20, 'First name can not be more than 50 characters'],

    //custom validator function
    validate: {
      validator: function (value: string) {
        const firstNameSrting = value.charAt(0).toUpperCase() + value.slice(1)
        return firstNameSrting === value
      },
      message: '{VALUE} is not in the capitalize',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not a valid last name',
    },
    trim: true,
  },
})

const gurdianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required'],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required'],
  },
})

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      require: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: userNameSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: "Gender can only be 'male', 'female', or 'other'",
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message:
          "Blood group must be one of 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', or 'O-'",
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    gurdian: {
      type: gurdianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: {
      type: String,
    },
    addmissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true }, // ✅ Ensure virtual properties are included
    toObject: { virtuals: true },
  },
)

// ** Virtual Property - Full Name **
studentSchema.virtual('fullName').get(function () {
  if (!this.name) return '' // Handle missing name field
  return `${this.name.firstName} ${this.name.middleName ? this.name.middleName + ' ' : ''}${this.name.lastName}`
})

//Document middleware/hook:

//Query middleware/hook:
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

//for creating static methods
studentSchema.statics.isUserExits = async function (id: string) {
  const existhingUser = await Student.findOne({ id })

  return existhingUser
}

// custom instance method
// studentSchema.methods.isUserExits = async function (id: string) {
//   const existhingUser = await Student.findOne({ id })
//   return existhingUser
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
