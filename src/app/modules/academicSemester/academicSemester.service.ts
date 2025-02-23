import { AcademicSemesterNameCodeMapper } from './AcademicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //semester name =----> semesterCode

  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester Code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllAcademicSemesterIntoDB = async () => {
  const result = await AcademicSemester.find()
  return result
}

const getSingleAcademicSemesterIntoDB = async (id: string) => {
  const result = await AcademicSemester.findById(id)
  return result
}

const deleteAcademicSemesterIntoDB = async (id: string) => {
  const result = await AcademicSemester.findByIdAndDelete(id)
  return result
}

const updateAcademicSemsterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Please provide all the required fields')
  }

  const result = await AcademicSemester.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterIntoDB,
  getSingleAcademicSemesterIntoDB,
  deleteAcademicSemesterIntoDB,
  updateAcademicSemsterIntoDB,
}
