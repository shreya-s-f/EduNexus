import { Router } from 'express';
import { getDepartments, getDepartmentByCode } from '../controllers/departmentController';

const router = Router();

router.get('/', getDepartments);
router.get('/:code', getDepartmentByCode);

export default router;
