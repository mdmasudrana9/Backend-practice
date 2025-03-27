import express, { NextFunction, Request, Response } from 'express'
import ValidateRequest from '../../middleware/validateRequest'
import { FacultyValidations } from '../Faculty/faculty.validation'
import { studentZodValidations } from '../student/student.zodvalidation'
import { userController } from './user.controller'
import { AdminValidations } from '../admin/admin.validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from './user.constant'
import { uservalidation } from './user.validation'
import { upload } from '../../utils/sendImageToCloudinary'
const router = express.Router()

router.post(
  '/create-student',
  // auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
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

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  userController.getMe,
)
router.post(
  '/change-status/:id',
  auth('admin'),
  ValidateRequest(uservalidation.changeStatususerValidationSchema),
  userController.changeStatus,
)

export const UserRoutes = router
