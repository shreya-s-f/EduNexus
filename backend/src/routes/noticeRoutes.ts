import { Router } from 'express';
import { getNotices, createNotice } from '../controllers/noticeController';
import { authenticateJwt } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';

const router = Router();

router.get('/', getNotices);
router.post('/', authenticateJwt, authorizeRoles('FACULTY', 'HOD', 'ADMIN'), createNotice);

export default router;
