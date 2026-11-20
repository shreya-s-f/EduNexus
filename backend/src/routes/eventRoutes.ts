import { Router } from 'express';
import { getEvents, registerForEvent } from '../controllers/eventController';
import { authenticateJwt } from '../middleware/auth';

const router = Router();

router.get('/', getEvents);
router.post('/register', authenticateJwt, registerForEvent);

export default router;
