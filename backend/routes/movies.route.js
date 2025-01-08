import express from 'express';

import { trendingmovies , movieTrailers, movieDetails, similarMovie} from '../controllers/movie.controller.js';

const router = express.Router()

router.get('/trending',trendingmovies)
router.get('/:id/trailer',movieTrailers)
router.get('/:id/details',movieDetails)
router.get('/:id/similar',similarMovie)

export default router