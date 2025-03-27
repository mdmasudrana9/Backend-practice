import express from 'express'
import { StudentController } from './student.controller'
import ValidateRequest from '../../middleware/validateRequest'
import { studentZodValidations } from './student.zodvalidation'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

//will call the controller function to create a student

// router.post('/create-student', StudentController.createStudent)
router.get('/', StudentController.getAllStudents)
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  StudentController.getSingleStudent,
)
router.delete('/:id', StudentController.deleteSingleStudent)
router.patch(
  '/:id',
  ValidateRequest(studentZodValidations.updateStudentZodValidationSchema),
  StudentController.updateStudent,
)

export const StudentRoutes = router
