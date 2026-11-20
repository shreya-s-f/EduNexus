import { Router } from 'express';
import { getCampusLocations } from '../controllers/campusController';

const router = Router();

router.get('/locations', getCampusLocations);

export default router;
