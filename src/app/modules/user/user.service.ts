import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'

import { User } from './user.model'
import generateStudentId from './user.utils'
import httpStatus from 'http-status'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //will create a student in the database

  //custom static method
  //   if (await Student.isUserExits(studentData.id)) {
  //     throw new Error('Student already exits')
  //   }
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'student'

  //find academic SemesterId
  const admissionSemester = await AcademicSemester.findById(
    payload.addmissionSemester,
  )
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found')
  }
  const session = await mongoose.startSession()

  try {
    //start session
    session.startTransaction()
    //set generated id
    userData.id = await generateStudentId(admissionSemester)
    //create a user(Transaction-1)
    const newUser = await User.create([userData], { session }) //built-in  static method of mongoose

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to New User')
    }

    payload.id = newUser[0].id
    payload.user = newUser[0]._id ///refrence id
    //Create a Student (Tranasction -2)

    const newStudent = await Student.create([payload], { session })
    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create  Student')
    }
    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Faild to Create a new Students')
  }

  //built-in instance method of mongoose
  // const student = new Student(studentData) // create an instance of the model

  // custom instance method
  // if (await student.isUserExits(studentData.id)) {
  //   throw new Error('Student already exits')
  // }
  // const result = await student.save()
}

export const userService = {
  createStudentIntoDB,
}
