import { Router } from 'express';
import {
  getPlacementAnalytics,
  getJobs,
  applyForJob,
  getStudentApplications,
  getInternships,
} from '../controllers/placementController';
import { authenticateJwt } from '../middleware/auth';

const router = Router();

router.get('/analytics', getPlacementAnalytics);
router.get('/jobs', getJobs);
router.post('/jobs/apply', authenticateJwt, applyForJob);
router.get('/my-applications', authenticateJwt, getStudentApplications);
router.get('/internships', getInternships);

export default router;
