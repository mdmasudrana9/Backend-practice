import express from 'express'
import { offeredCourseController } from './offeredCourse.controller'
import ValidateRequest from '../../middleware/validateRequest'
import { OfferedCourseValidations } from './offeredCourse.Validation'

const router = express.Router()

router.post(
  '/create-offered-course',
  ValidateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseController.createOfferedCourse,
)

router.get('/', offeredCourseController.getAllOfferedCourses)
router.get('/:id', offeredCourseController.getSingleOfferedCourse)

router.patch(
  '/:id',
  ValidateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  offeredCourseController.updateOfferedCourse,
)

router.delete('/:id', offeredCourseController.deleteOfferedCourse)

export const offeredCourseRoutes = router
