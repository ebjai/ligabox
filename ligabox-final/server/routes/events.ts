import { Router } from 'express';
import { getAllEvents, getSingleEvent } from '../controllers/eventsController';

const router = Router();

router.get('/', getAllEvents);
router.get('/:slug', getSingleEvent);

export default router;
