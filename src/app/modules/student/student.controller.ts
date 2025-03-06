import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { StudentService } from './student.service'

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentService.getAllStudentsFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student  Fatch Successfully',
    data: result,
  })
})

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const result = await StudentService.getSingleStudentsFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single  Student Fatch Successfully',
    data: result,
  })
})

const deleteSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const result = await StudentService.deleteSingleStudentsFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student  delete Successfully',
    data: result,
  })
})

// Controller function

const updateStudent = catchAsync(async (req, res, next): Promise<void> => {
  const { id } = req.params
  const { student } = req.body

  const result = await StudentService.updateStudentInDB(id, student)

  if (!result) {
    res.status(404).json({ success: false, message: 'Student not found' })
    return
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student  Update Successfully',
    data: result,
  })
})

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
  updateStudent,
}
