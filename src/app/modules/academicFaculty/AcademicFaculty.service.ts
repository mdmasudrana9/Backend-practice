import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const CreateAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload)
  return result
}

const getAllAcademicFacultyIntoDB = async () => {
  const result = await AcademicFaculty.find()
  return result
}

const getSingleAcademicFacultyIntoDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id)
  return result
}

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const AcademicFacultyservices = {
  CreateAcademicFacultyIntoDB,
  getAllAcademicFacultyIntoDB,
  getSingleAcademicFacultyIntoDB,
  updateAcademicFacultyIntoDB,
}
