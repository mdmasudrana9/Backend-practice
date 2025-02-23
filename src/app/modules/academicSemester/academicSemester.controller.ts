import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester  Created Successfully',
    data: result,
  })
})

const getAllAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterIntoDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic Semester get successFully',
    data: result,
  })
})

const getSingleAcademicSemester = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterIntoDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single academic semester retrive successFully',
    data: result,
  })
})

const deleteAcademicSemester = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const result = await AcademicSemesterServices.deleteAcademicSemesterIntoDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester deleted SuccessFully',
    data: result,
  })
})

const updateAcademicSemster = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const result = await AcademicSemesterServices.updateAcademicSemsterIntoDB(
    id,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester Update successFully',
    data: result,
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  deleteAcademicSemester,
  updateAcademicSemster,
}
