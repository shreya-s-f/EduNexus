import { Router } from 'express';
import { getClubs, joinClub } from '../controllers/clubController';
import { authenticateJwt } from '../middleware/auth';

const router = Router();

router.get('/', getClubs);
router.post('/join', authenticateJwt, joinClub);

export default router;
