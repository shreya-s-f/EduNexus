import { Router } from 'express';
import { askCampusAI } from '../controllers/aiController';

const router = Router();

// Open to public and authenticated users alike (with personalization when authenticated)
router.post('/ask', askCampusAI);

export default router;
