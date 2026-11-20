import { Router } from 'express';
import {
  getAssignments,
  createAssignment,
  submitAssignment,
  getStudentSubmissions,
} from '../controllers/assignmentController';
import { authenticateJwt } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';

const router = Router();

router.get('/', authenticateJwt, getAssignments);
router.post('/', authenticateJwt, authorizeRoles('FACULTY', 'HOD', 'ADMIN'), createAssignment);
router.post('/submit', authenticateJwt, submitAssignment);
router.get('/my-submissions', authenticateJwt, getStudentSubmissions);

export default router;
