import { Request, Response } from 'express'
import * as reviewService from '../services/reviewService'

export const createReview = async (req: Request, res: Response) => {
    try {
        const review = await reviewService.createReview(req.body)
        res.status(201).json(review)
    } catch (error) {
        res.status(500).json({ message: 'Error creating review', error })
    }
}

export const getReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await reviewService.getReviews()
        res.json(reviews)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error })
    }
}

export const deleteReview = async ( req: Request<{ id: string }>, res: Response ) => {
    try {
        await reviewService.deleteReview(req.params.id)
        res.json({ message: 'Review deleted' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error })
    }
}

export const updateReview = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const updated = await reviewService.updateReviewById(req.params.id, req.body.title, req.body.content, req.body.rating);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
};