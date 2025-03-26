import { Router } from 'express'
import ValidateRequest from '../../middleware/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.post(
  '/login',
  ValidateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
)
router.post(
  '/refresh-token',
  ValidateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
)
router.post(
  '/forget-password',
  ValidateRequest(AuthValidation.forgotPasswordValidationSchema),
  AuthController.forgotPassword,
)
router.post(
  '/reset-password',
  ValidateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthController.resetPassword,
)
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  ValidateRequest(AuthValidation.changePassWordValidationSchema),
  AuthController.changePassword,
)

// router.get('/:id', AdminControllers.getSingleAdmin)

// router.patch(
//   '/:id',

//   ValidateRequest(updateAdminValidationSchema),
//   AdminControllers.updateAdmin,
// )

// router.delete('/:adminId', AdminControllers.deleteAdmin)

export const AuthRoutes = router
