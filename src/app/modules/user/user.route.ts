import express from 'express'
import ValidateRequest from '../../middleware/validateRequest'
import { FacultyValidations } from '../Faculty/faculty.validation'
import { studentZodValidations } from '../student/student.zodvalidation'
import { userController } from './user.controller'
import { AdminValidations } from '../admin/admin.validation'
const router = express.Router()

router.post(
  '/create-student',
  ValidateRequest(studentZodValidations.createStudentZodValidationSchema),
  userController.createStudent,
)
router.post(
  '/create-faculty',
  ValidateRequest(FacultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
)
router.post(
  '/create-admin',
  ValidateRequest(AdminValidations.createAdminValidationSchema),
  userController.createAdmin,
)
export const UserRoutes = router
