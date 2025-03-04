import { model, Schema } from 'mongoose'
import { FacultyModel, TFaculty, TuserName } from './faculty.interface'
import { BloodGroup, Gender } from './faculty.constant'
import { date } from 'joi'

const userNameSchema = new Schema<TuserName, FacultyModel>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 character'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 character'],
  },
})

const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is required'],
      unique: true,
      ref: 'User',
    },
    designation: { type: String, required: [true, 'Designation is required'] },
    name: {
      type: userNameSchema,
      required: [true, 'Name id required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender',
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
      required: [true, 'ContactNo is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'ContactNo is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group ',
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
    profileImg: { type: String, default: '' },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Acadcemic Department is required'],
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'Acadcemic Faculty is required'],
      ref: 'AcademicFaculty',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

//getting Generate Full name

facultySchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    '' +
    this?.name?.middleName +
    '' +
    this?.name?.lastName
  )
})

// filterOut deletd Documents
facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
facultySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

facultySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

//checking if user is already exist!
facultySchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Faculty.findOne({ id })
  return existingUser
}

export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema)
