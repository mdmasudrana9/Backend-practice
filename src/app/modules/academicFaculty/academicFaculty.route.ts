import { Router } from 'express'
import ValidateRequest from '../../middleware/validateRequest'

import { academicFacultyuservalidation } from './academicFaculty.validation'
import { AcademicFacultyControllers } from './academicFaculty.controller'

const router = Router()

router.post(
  '/create-academic-faculty',
  ValidateRequest(
    academicFacultyuservalidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
)

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties)
router.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty)
router.patch(
  '/:id',
  ValidateRequest(
    academicFacultyuservalidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
)

export const AcademicFaculyRoutes = router
