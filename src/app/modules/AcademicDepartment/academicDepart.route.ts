import { Router } from 'express'
import ValidateRequest from '../../middleware/validateRequest'
import { academicDepartmentValidation } from './academicDepart.validation'
import { AcademicDepartmentControllers } from './academicDepart.controller'

const router = Router()

router.post(
  '/create-academic-department',
  ValidateRequest(
    academicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
)

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment)
router.get('/:id', AcademicDepartmentControllers.getSingleAcademicDepartment)
router.patch(
  '/:id',
  ValidateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
)

export const AcademicDepartmentRoutes = router
