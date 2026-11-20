import { Router } from 'express';
import { getHostels, getRooms, applyHostelRoom } from '../controllers/hostelController';
import { authenticateJwt } from '../middleware/auth';

const router = Router();

router.get('/', getHostels);
router.get('/rooms', getRooms);
router.post('/apply', authenticateJwt, applyHostelRoom);

export default router;
