import { Request, Response } from 'express'
import { StudentService } from './student.service'
import studentZodValidationSchema from './student.zodvalidation'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    //validation using joi
    //const { error, value } = joiValidationStudentSchema.validate(studentData)

    //validation using zod
    const zodparseData = studentZodValidationSchema.parse(studentData)

    //will call the service function to create a student
    const result = await StudentService.createStudentIntoDB(zodparseData)
    //send the response
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Some Thing went wrong',
      error: error,
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'All students fetched successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Some Thing went wrong',
      error: error,
    })
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentService.getSingleStudentsFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student fetched successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Some Thing went wrong',
      error: error,
    })
  }
}

const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentService.deleteSingleStudentsFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Some Thing went wrong',
      error: error,
    })
  }
}

// Controller function

const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId } = req.params
    const updatedData = req.body

    const result = await StudentService.updateStudentInDB(
      studentId,
      updatedData,
    )

    if (!result) {
      res.status(404).json({ success: false, message: 'Student not found' })
      return
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: result,
    })
  } catch (error: any) {
    console.error('Error updating student:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
  updateStudent,
}
