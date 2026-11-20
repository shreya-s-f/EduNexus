import { Router } from 'express';
import { getExams, getStudentResults } from '../controllers/examController';
import { authenticateJwt } from '../middleware/auth';

const router = Router();

router.get('/', authenticateJwt, getExams);
router.get('/results', authenticateJwt, getStudentResults);

export default router;
