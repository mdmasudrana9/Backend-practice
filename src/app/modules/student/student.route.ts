import express from 'express'
import { StudentController } from './student.controller'

const router = express.Router()

//will call the controller function to create a student

// router.post('/create-student', StudentController.createStudent)
router.get('/', StudentController.getAllStudents)
router.get('/:studentId', StudentController.getSingleStudent)
router.delete('/:studentId', StudentController.deleteSingleStudent)
router.patch('/:studentId', StudentController.updateStudent)

export const StudentRoutes = router
