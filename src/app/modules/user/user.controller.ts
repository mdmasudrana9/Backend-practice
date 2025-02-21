import { userService } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body
  //validation using joi
  //const { error, value } = joiValidationStudentSchema.validate(studentData)

  //validation using zod
  // const zodparseData = studentZodValidationSchema.parse(studentData)

  //will call the service function to create a student
  const result = await userService.createStudentIntoDB(password, studentData)
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

export const userController = {
  createStudent,
}
