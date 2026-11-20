import { Router } from 'express';
import { getHodDashboard } from '../controllers/hodController';
import { authenticateJwt } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';

const router = Router();

router.get('/dashboard', authenticateJwt, authorizeRoles('HOD', 'ADMIN'), getHodDashboard);

export default router;
