import mongoose from 'mongoose'
import { TStudent } from './student.interface'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { object } from 'joi'

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('addmissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    })
  return result
}
const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('addmissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    })
  // const result = await Student.aggregate([{ $match: { id: id } }])
  return result
}

const deleteSingleStudentsFromDB = async (id: string) => {
  const session = await mongoose.startSession() // Start session
  session.startTransaction() // Start transaction

  try {
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student')
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User')
    }

    await session.commitTransaction() // Commit transaction
    session.endSession() // End session

    return deletedStudent
  } catch (error) {
    await session.abortTransaction() // Abort transaction in case of error
    session.endSession() // Ensure session is closed
    throw error // Rethrow the error so the API response can handle it
  }
}

// Service function to update student data
const updateStudentInDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, gurdian, localGuardian, ...remainingStudentData } = payload
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }
  if (gurdian && Object.keys(gurdian).length) {
    for (const [key, value] of Object.entries(gurdian)) {
      modifiedUpdatedData[`gurdian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findOneAndUpdate(
    { id },
    { $set: modifiedUpdatedData },
    { new: true, runValidators: true }, // Return updated document and validate changes
  )
  return result
}

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteSingleStudentsFromDB,
  updateStudentInDB,
}
