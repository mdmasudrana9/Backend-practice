import express from 'express'
import ValidateRequest from '../../middleware/validateRequest'
import { semsterRegistrationValidations } from './semesterRegistration.validation'
import { SemesterRegistrationController } from './semesterRegistration.controller'

const router = express.Router()

router.post(
  '/create-semester-registrtion',
  ValidateRequest(
    semsterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
)

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations)

router.get('/:id', SemesterRegistrationController.getSingleSemesterRegistration)

router.patch(
  '/:id',
  ValidateRequest(
    semsterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
)

router.delete('/:id', SemesterRegistrationController.deleteSemesterRegistration)

export const SemesterRegistrationRoutes = router
