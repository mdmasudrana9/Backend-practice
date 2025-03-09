import { Types } from 'mongoose'
import { Days } from './offeredCourse.constant'

export type TDays =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'

export type TOfferedCourse = {
  semesterRegistration: Types.ObjectId
  academicSemester?: Types.ObjectId
  academicFaculty: Types.ObjectId
  academicDepartment: Types.ObjectId
  course: Types.ObjectId
  faculty: Types.ObjectId
  maxCapacity: number
  section: number
  days: TDays[]
  startTime: string
  endTime: string
}

export type TSchedule = {
  days: TDays[]
  startTime: string
  endTime: string
}
