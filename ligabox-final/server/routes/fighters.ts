import { Router } from 'express';
import {
  getAllFighters,
  getSingleFighter,
  getFightersWithPhotos,
} from '../controllers/fightersController';

const router = Router();

router.get('/', getAllFighters);
router.get('/with-photos', getFightersWithPhotos);
router.get('/:slug', getSingleFighter);

export default router;
