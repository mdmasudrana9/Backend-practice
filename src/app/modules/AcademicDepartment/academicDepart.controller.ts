import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

import httpStatus from 'http-status'
import { AcademicDepartmentServices } from './academicDepart.service'

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.CreateAcademicDepartmentIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Created SuccessFully',
    data: result,
  })
})

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentIntoDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' All Department retrived successFully',
    data: result,
  })
})
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentIntoDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Single Department retrived successFully',
    data: result,
  })
})
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(id, payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Update Department  successFully',
    data: result,
  })
})

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
}
