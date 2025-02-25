import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicFacultyservices } from './AcademicFaculty.service'
import httpStatus from 'http-status'

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyservices.CreateAcademicFacultyIntoDB(
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Created SuccessFully',
    data: result,
  })
})

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyservices.getAllAcademicFacultyIntoDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' All Faculty retrived successFully',
    data: result,
  })
})
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await AcademicFacultyservices.getSingleAcademicFacultyIntoDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Single Faculty retrived successFully',
    data: result,
  })
})
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body
  const result = await AcademicFacultyservices.updateAcademicFacultyIntoDB(
    id,
    payload,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Update Faculty  successFully',
    data: result,
  })
})

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
}
