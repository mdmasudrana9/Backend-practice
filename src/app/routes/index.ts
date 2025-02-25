import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { StudentRoutes } from '../modules/student/student.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { AcademicFaculyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoutes } from '../modules/AcademicDepartment/academicDepart.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFaculyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

// router.use('/users', UserRoutes)
// router.use('/students', StudentRoutes)

export default router
