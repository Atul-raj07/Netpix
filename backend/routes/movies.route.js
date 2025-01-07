import express from 'express';

import { trendingmovies , movieTrailers, movieDetails} from '../controllers/movie.controller.js';

const router = express.Router()

router.get('/trending',trendingmovies)
router.get('/:id/trailer',movieTrailers)
router.get('/:id/details',movieDetails)

export default router