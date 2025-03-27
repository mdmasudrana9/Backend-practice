import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { userService } from './user.service'
import AppError from '../../errors/AppError'

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body
  //validation using joi
  //const { error, value } = joiValidationStudentSchema.validate(studentData)

  //validation using zod
  // const zodparseData = studentZodValidationSchema.parse(studentData)

  //will call the service function to create a student
  const result = await userService.createStudentIntoDB(
    req.file,
    password,
    studentData,
  )
  //send the response
  // res.status(200).json({
  //   success: true,
  //   message: 'Student created successfully',
  //   data: result,
  // })
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student  Created Successfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body

  const result = await userService.createFacultyIntoDB(password, facultyData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  })
})

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body

  const result = await userService.createAdminIntoDB(password, adminData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  })
})

const getMe = catchAsync(async (req, res) => {
  // const token = req.headers.authorization

  // if (!token) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Token not found')
  // }

  const { userId, role } = req.user
  const result = await userService.getMeIntoDB(userId, role)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User data fetched successfully',
    data: result,
  })
})
const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await userService.changeStatusIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Status change successfully',
    data: result,
  })
})

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
}
