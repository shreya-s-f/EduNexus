import { Router } from 'express';
import { getFacultyDashboard, getAllFaculty } from '../controllers/facultyController';
import { authenticateJwt } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';

const router = Router();

router.get('/dashboard', authenticateJwt, authorizeRoles('FACULTY', 'HOD', 'ADMIN'), getFacultyDashboard);
router.get('/', getAllFaculty);

export default router;
