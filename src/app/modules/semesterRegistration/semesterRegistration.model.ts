import { Schema, model } from 'mongoose'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { semesterRegistrationStatus } from './semesterRegistration.constant'

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    status: {
      type: String,
      enum: semesterRegistrationStatus,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      required: true,
      min: 3,
    },
    maxCredit: {
      type: Number,
      required: true,
      min: 15,
    },
  },
  {
    timestamps: true,
  },
)

export const SemesterRegistration = model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
)
