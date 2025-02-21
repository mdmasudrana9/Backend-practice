import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'

import { User } from './user.model'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //will create a student in the database

  //custom static method
  //   if (await Student.isUserExits(studentData.id)) {
  //     throw new Error('Student already exits')
  //   }
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'student'
  //set manually id
  userData.id = '2030100001'
  //create a user
  const newUser = await User.create(userData) //built-in  static method of mongoose

  //create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id
    studentData.user = newUser._id ///refrence id
    const newStudent = await Student.create(studentData)
    return newStudent
  }

  //built-in instance method of mongoose
  // const student = new Student(studentData) // create an instance of the model

  // custom instance method
  // if (await student.isUserExits(studentData.id)) {
  //   throw new Error('Student already exits')
  // }

  // const result = await student.save()
}

export const userService = {
  createStudentIntoDB,
}
