import { TStudent } from './student.interface'
import { Student } from './student.model'

const createStudentIntoDB = async (studentData: TStudent) => {
  //will create a student in the database

  //custom static method
  if (await Student.isUserExits(studentData.id)) {
    throw new Error('Student already exits')
  }
  const result = await Student.create(studentData) //built-in  static method of mongoose
  //built-in instance method of mongoose
  // const student = new Student(studentData) // create an instance of the model

  // custom instance method
  // if (await student.isUserExits(studentData.id)) {
  //   throw new Error('Student already exits')
  // }

  // const result = await student.save()
  return result
}
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
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteSingleStudentsFromDB,
  updateStudentInDB,
}
