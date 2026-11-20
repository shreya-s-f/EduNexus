import { Router } from 'express';
import { getWeeklyTimetable, getTodaySchedule } from '../controllers/timetableController';
import { authenticateJwt } from '../middleware/auth';

const router = Router();

router.get('/weekly', authenticateJwt, getWeeklyTimetable);
router.get('/today', authenticateJwt, getTodaySchedule);

export default router;
