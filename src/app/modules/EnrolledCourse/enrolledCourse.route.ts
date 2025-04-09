import express from 'express'

import { EnrolledCourseControllers } from './enrolledCourse.controller'
import { EnrolledCourseValidations } from './enrolledCourse.validaton'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'
import ValidateRequest from '../../middleware/validateRequest'

const router = express.Router()

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  ValidateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
)

router.get(
  '/',
  auth(USER_ROLE.faculty),
  EnrolledCourseControllers.getAllEnrolledCourses,
)

router.get(
  '/my-enrolled-courses',
  auth(USER_ROLE.student),
  EnrolledCourseControllers.getMyEnrolledCourses,
)

router.patch(
  '/update-enrolled-course-marks',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  ValidateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
)

export const EnrolledCourseRoutes = router
