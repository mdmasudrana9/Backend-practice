import { Router } from 'express'
import { CourseValidations } from './course.validation'
import { CourseControllers } from './course.controller'
import ValidateRequest from '../../middleware/validateRequest'

const router = Router()

router.post(
  '/create-course',
  ValidateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
)

router.get('/', CourseControllers.getAllCourse)
router.get('/:id', CourseControllers.getSingleCourse)
router.delete('/:id', CourseControllers.deleteCourse)
router.patch(
  '/:id',
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
  ValidateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
)

export const CourseRoutes = router
