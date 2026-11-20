import { Router } from 'express';
import { getStudentDashboard, updateStudentProfile, getAllStudents } from '../controllers/studentController';
import { authenticateJwt } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';

const router = Router();

router.get('/dashboard', authenticateJwt, getStudentDashboard);
router.put('/profile', authenticateJwt, updateStudentProfile);
router.get('/', authenticateJwt, authorizeRoles('FACULTY', 'HOD', 'ADMIN', 'PLACEMENT_OFFICER'), getAllStudents);

export default router;
