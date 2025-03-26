import express from 'express'
import ValidateRequest from '../../middleware/validateRequest'
import { FacultyValidations } from '../Faculty/faculty.validation'
import { studentZodValidations } from '../student/student.zodvalidation'
import { userController } from './user.controller'
import { AdminValidations } from '../admin/admin.validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from './user.constant'
const router = express.Router()

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  ValidateRequest(studentZodValidations.createStudentZodValidationSchema),
  userController.createStudent,
)
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  ValidateRequest(FacultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
)
router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  ValidateRequest(AdminValidations.createAdminValidationSchema),
  userController.createAdmin,
)
export const UserRoutes = router
