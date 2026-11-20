import { Router } from 'express';
import { getAdminStats } from '../controllers/adminController';
import { authenticateJwt } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';

const router = Router();

router.get('/stats', authenticateJwt, authorizeRoles('ADMIN'), getAdminStats);

export default router;
