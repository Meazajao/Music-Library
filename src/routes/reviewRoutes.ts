import express from 'express'
import * as reviewController from '../controllers/reviewController'

const router = express.Router()

router.post('/reviews', reviewController.createReview)
router.get('/reviews', reviewController.getReviews)
router.delete('/reviews/:id', reviewController.deleteReview)

export default router;
