import express from 'express'
import * as reviewController from '../controllers/reviewController'
import { verifyToken } from '../middlewares/authMiddleware'
const router = express.Router()

router.post('/', verifyToken, reviewController.createReview)
router.get('/', reviewController.getReviews)
router.delete('/:id', verifyToken, reviewController.deleteReview)

export default router
