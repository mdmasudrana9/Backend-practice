import { Router } from 'express'
import { CourseValidations } from './course.validation'
import { CourseControllers } from './course.controller'
import ValidateRequest from '../../middleware/validateRequest'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  ValidateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
)

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  CourseControllers.getAllCourse,
)
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  CourseControllers.getSingleCourse,
)
router.delete('/:id', CourseControllers.deleteCourse)
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  ValidateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
)

router.put(
  '/:courseId/assign-faculties',
  ValidateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
)

router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.admin),
  ValidateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
)

export const CourseRoutes = router
