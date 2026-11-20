import { Router } from 'express';
import { getBuses, getBusLiveLocation } from '../controllers/transportController';

const router = Router();

router.get('/', getBuses);
router.get('/live/:busNumber', getBusLiveLocation);

export default router;
