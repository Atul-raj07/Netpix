import express from 'express';

import { trendingmovies , movieTrailers, movieDetails, similarMovie, movieCategory} from '../controllers/movie.controller.js';

const router = express.Router()

router.get('/trending',trendingmovies)
router.get('/:id/trailer',movieTrailers)
router.get('/:id/details',movieDetails)
router.get('/:id/similar',similarMovie)
router.get('/:category',movieCategory)

export default router