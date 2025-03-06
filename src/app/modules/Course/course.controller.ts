import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { couserServices } from './course.service'

const createCourse = catchAsync(async (req, res) => {
  const result = await couserServices.createCourseIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is  Created SuccessFully',
    data: result,
  })
})

const getAllCourse = catchAsync(async (req, res) => {
  const result = await couserServices.getAllCourseFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Course retrived successFully',
    data: result,
  })
})
const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await couserServices.getSingleCourseFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Single Course retrived successFully',
    data: result,
  })
})
const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body
  const result = await couserServices.updateCourseIntoDB(id, payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Faculty  successFully',
    data: result,
  })
})

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await couserServices.deleteCourseFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Single Course  Delete successfully',
    data: result,
  })
})

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const { faculties } = req.body

  const result = await couserServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties assigned  successfully',
    data: result,
  })
})

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const { faculties } = req.body

  const result = await couserServices.removeFacultiesFromCourseFromDB(
    courseId,
    faculties,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties removed successfully',
    data: result,
  })
})

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
}
