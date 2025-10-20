import { Router } from 'express';
import { getAllArticles, getSingleArticle } from '../controllers/articlesController';

const router = Router();

router.get('/', getAllArticles);
router.get('/:slug', getSingleArticle);

export default router;
