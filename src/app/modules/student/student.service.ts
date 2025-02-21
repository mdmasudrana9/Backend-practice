import { TStudent } from './student.interface'
import { Student } from './student.model'

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}
const getSingleStudentsFromDB = async (id: string) => {
  // const result = await Student.findOne({ id })
  const result = await Student.aggregate([{ $match: { id: id } }])
  return result
}
const deleteSingleStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne(
    { id },
    {
      $set: {
        isDeleted: true,
      },
    },
  )
  return result
}

// Service function to update student data
const updateStudentInDB = async (id: string, updateData: Partial<TStudent>) => {
  const result = await Student.findOneAndUpdate(
    { id },
    { $set: updateData },
    { new: true, runValidators: true }, // Return updated document and validate changes
  )
  return result
}

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteSingleStudentsFromDB,
  updateStudentInDB,
}
