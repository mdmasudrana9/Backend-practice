import { Router } from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'
import ValidateRequest from '../../middleware/validateRequest'
import { AcademicSemesterValidationSchema } from './academicSemester.validation'

const router = Router()

router.post(
  '/create-academic-semester',
  ValidateRequest(
    AcademicSemesterValidationSchema.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
)

router.get('/', AcademicSemesterControllers.getAllAcademicSemester)
router.get('/:id', AcademicSemesterControllers.getSingleAcademicSemester)
router.delete('/:id', AcademicSemesterControllers.deleteAcademicSemester)
router.patch(
  '/:id',
  ValidateRequest(
    AcademicSemesterValidationSchema.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemster,
)

export const AcademicSemesterRoutes = router
