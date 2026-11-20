import { Router } from 'express';
import {
  submitComplaint,
  getStudentComplaints,
  getAllComplaints,
  updateComplaintStatus,
} from '../controllers/complaintController';
import { authenticateJwt } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';

const router = Router();

router.post('/', authenticateJwt, submitComplaint);
router.get('/my-complaints', authenticateJwt, getStudentComplaints);
router.get('/', authenticateJwt, authorizeRoles('ADMIN', 'HOD'), getAllComplaints);
router.patch('/:ticketId', authenticateJwt, authorizeRoles('ADMIN', 'HOD'), updateComplaintStatus);

export default router;
