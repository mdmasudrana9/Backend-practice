import httpStatus from 'http-status'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { TStudent } from './student.interface'
import { Student } from './student.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { studentSearchablefields } from './student.constant'

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // console.log('base query', query)
  // const queryObj = { ...query }

  // let searchTerm = ''
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchablefields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  //Filtering
  // const excludeFileds = ['searchTerm', 'sort', 'limit', 'page', 'fields']

  // excludeFileds.forEach((el) => delete queryObj[el])
  // console.log({ query }, { queryObj })

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('addmissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: { path: 'academicFaculty' },
  //   })

  //sorting
  // let sort = '-createdAt'
  // if (query.sort) {
  //   sort = query.sort as string
  // }

  // const sortQuery = filterQuery.sort(sort)
  // let page = 1
  // let limit = 1
  // let skip = 0

  // if (query.limit) {
  //   limit = Number(query.limit)
  // }

  // if (query.page) {
  //   page = Number(query.page)
  //   skip = (page - 1) * limit
  // }

  // const paginateQuery = sortQuery.skip(skip)

  // const limitQuery = paginateQuery.limit(limit)

  // //Fields Limiting
  // let fields = '-__v'

  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ')
  //   console.log(fields)
  // }

  // const fieldsQuery = await limitQuery.select(fields)

  // return fieldsQuery

  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(studentSearchablefields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate()

  const result = await studentQuery.modelQuery
  return result
}

const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findById(id)
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
    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student')
    }

    const userId = deletedStudent.user

    const deletedUser = await User.findByIdAndUpdate(
      userId,
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

  const result = await Student.findByIdAndUpdate(
    id,
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
