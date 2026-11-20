import { Router } from 'express';
import { getStudentAttendanceSummary, markBatchAttendance } from '../controllers/attendanceController';
import { authenticateJwt } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';

const router = Router();

router.get('/summary', authenticateJwt, getStudentAttendanceSummary);
router.post('/mark', authenticateJwt, authorizeRoles('FACULTY', 'HOD', 'ADMIN'), markBatchAttendance);

export default router;
