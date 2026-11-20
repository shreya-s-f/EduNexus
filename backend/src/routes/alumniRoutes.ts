import { Router } from 'express';
import { getAlumniDirectory } from '../controllers/alumniController';

const router = Router();

router.get('/', getAlumniDirectory);

export default router;
