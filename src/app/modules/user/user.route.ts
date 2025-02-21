import express from 'express'
import ValidateRequest from '../../middleware/validateRequest'
import { studentZodValidations } from '../student/student.zodvalidation'
import { userController } from './user.controller'
const router = express.Router()

router.post(
  '/create-student',
  ValidateRequest(studentZodValidations.createStudentZodValidationSchema),
  userController.createStudent,
)
export const UserRoutes = router
