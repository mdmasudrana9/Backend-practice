import { Types } from 'mongoose'

export type TSemesterRegistration = {
  academicSemester: Types.ObjectId
  status: 'UPCOMING' | 'ONGOGING' | 'ENDED'
  startDate: Date
  endDate: Date
  minCredit: number
  maxCredit: number
}
