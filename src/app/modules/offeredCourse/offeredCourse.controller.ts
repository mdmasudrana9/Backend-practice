import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { offeredCourseService } from './offeredCourse.service'

export const createOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const result = await offeredCourseService.createOfferedCourseIntoDB(
      req.body,
    )
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Offered course created successfully',
      data: result,
    })
  },
)

export const getAllOfferedCourses = catchAsync(
  async (req: Request, res: Response) => {
    const offeredCourses =
      await offeredCourseService.getAllOfferedCoursesFromDB(req.query)
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Offered courses retrieved successfully',
      data: offeredCourses,
    })
  },
)

export const getSingleOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const offeredCourse =
      await offeredCourseService.getSingleOfferedCourseIntoDB(id)
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Offered course retrieved successfully',
      data: offeredCourse,
    })
  },
)

export const updateOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const updatedCourse = await offeredCourseService.updateOfferedCourseIntoDB(
      id,
      req.body,
    )
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Offered course updated successfully',
      data: updatedCourse,
    })
  },
)

export const deleteOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    await offeredCourseService.deleteOfferedCourseIntoDB(id)
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Offered course deleted successfully',
    })
  },
)

export const offeredCourseController = {
  createOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
}
