import { Router } from 'express';
import { getSingleFight, updateFightResult } from '../controllers/fightsController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/:id', getSingleFight);
router.post('/:id/result', authenticate, authorize('admin'), updateFightResult);

export default router;
