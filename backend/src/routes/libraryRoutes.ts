import { Router } from 'express';
import { getLibraryBooks, requestBookIssue, getStudentIssuedBooks } from '../controllers/libraryController';
import { authenticateJwt } from '../middleware/auth';

const router = Router();

router.get('/books', getLibraryBooks);
router.post('/issue', authenticateJwt, requestBookIssue);
router.get('/my-books', authenticateJwt, getStudentIssuedBooks);

export default router;
