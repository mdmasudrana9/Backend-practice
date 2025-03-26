import { Router } from 'express'
import { FacultyControllers } from './faculty.controller'
import ValidateRequest from '../../middleware/validateRequest'
import {
  FacultyValidations,
  updateFacultyValidationSchema,
} from './faculty.validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.get('/:id', FacultyControllers.getSingleFaculty)
router.patch(
  '/:id',
  ValidateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
)
router.delete('/:id', FacultyControllers.deleteFaculty)
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculties,
)

export const FacultyRoutes = router
