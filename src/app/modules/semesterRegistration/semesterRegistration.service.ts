import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import {
  RegistrationStatus,
  semesterRegistrationStatus,
} from './semesterRegistration.constant'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistration } from './semesterRegistration.model'
import httpStatus from 'http-status'

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester

  const isThereAnyUpcommingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        {
          status: RegistrationStatus.ONGOING,
        },
      ],
    })
  if (isThereAnyUpcommingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcommingOrOngoingSemester.status} registerd semester`,
    )
  }
  //check if the semester is exits
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester)
  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This acdemic semester not found')
  }

  //check if the semester is already exits
  const isSemeterRegistrtionExits = await SemesterRegistration.findOne({
    academicSemester,
  })
  if (isSemeterRegistrtionExits) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This  semester is already registerd',
    )
  }

  const result = await SemesterRegistration.create(payload)
  return result
}

const getAllSemesterRegistrations = async (query: Record<string, unknown>) => {
  const SemesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await SemesterRegistrationQuery.modelQuery
  return result
}

const getSingleSemesterRegistration = async (id: string) => {
  const result = await SemesterRegistration.findById(id)
  return result
}

const updateSemesterRegistration = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const requestedStatus = payload?.status
  //check if the semester is  exits
  const isSemeterRegistrtionExits = await SemesterRegistration.findById(id)

  if (!isSemeterRegistrtionExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'This  semester is not found')
  }

  // if the requested semester is eneded , we will not updated anything

  const CurrentrequestedSemesterStatus = isSemeterRegistrtionExits?.status

  if (CurrentrequestedSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This Semester is Already ${CurrentrequestedSemesterStatus}`,
    )
  }

  //Upcomming ---->Onging ---->Ended

  if (
    CurrentrequestedSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly status from ${CurrentrequestedSemesterStatus}to ${requestedStatus}`,
    )
  }

  if (
    CurrentrequestedSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly status from ${CurrentrequestedSemesterStatus}to ${requestedStatus}`,
    )
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteSemesterRegistration = async (id: string) => {
  return await SemesterRegistration.findByIdAndDelete(id)
}

export const SemesterRegistrationService = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
}
