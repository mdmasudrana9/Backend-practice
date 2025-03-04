import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'

import { User } from './user.model'

import httpStatus from 'http-status'
import { TFaculty } from '../Faculty/faculty.interface'
import { AcademicDepartment } from './../AcademicDepartment/academicDepart.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils'
import { Faculty } from '../Faculty/faculty.model'
import { Admin } from '../admin/admin.model'
import { TAdmin } from '../admin/admin.interface'

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
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }

  //built-in instance method of mongoose
  // const student = new Student(studentData) // create an instance of the model

  // custom instance method
  // if (await student.isUserExits(studentData.id)) {
  //   throw new Error('Student already exits')
  // }
  // const result = await student.save()
}

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  //create a user objects
  const userData: Partial<TUser> = {}
  // if password is not given , use default password
  userData.password = password || (config.default_password as string)

  //set Faculty role

  userData.role = 'faculty'

  // find academic department info

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  )

  if (!academicDepartment) {
    throw new AppError(400, 'Academic Department not found')
  }
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set generated User id
    userData.id = await generateFacultyId()

    // create a new user
    const newUser = await User.create([userData], { session })

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session })

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    await session.commitTransaction()
    await session.endSession()

    return newFaculty
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
}

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'admin'

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateAdminId()

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session })

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const userService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
}
