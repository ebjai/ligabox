import { Router } from 'express';
import {
  getAllRankings,
  getSingleWeightClassRankings,
} from '../controllers/rankingsController';

const router = Router();

router.get('/', getAllRankings);
router.get('/:weightClass', getSingleWeightClassRankings);

export default router;
