import { TAcademicDepartment } from './academicDepart.interface'
import { AcademicDepartment } from './academicDepart.model'

const CreateAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload)
  return result
}

const getAllAcademicDepartmentIntoDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty')
  return result
}

const getSingleAcademicDepartmentIntoDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty')
  return result
}

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}

export const AcademicDepartmentServices = {
  CreateAcademicDepartmentIntoDB,
  updateAcademicDepartmentIntoDB,
  getSingleAcademicDepartmentIntoDB,
  getAllAcademicDepartmentIntoDB,
}
