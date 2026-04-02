import Review from "../models/review";

export const createReview = async (data: any) => {
    return await Review.create(data);
};

export const getReviews = async () => {
    return await Review.find().sort({ createdAt: -1 });
};

export const deleteReview = async (id: string) => {
    return await Review.findByIdAndDelete(id);
};

export const updateReviewById = async (
    id: string,
    title: string,
    content: string,
    rating: number
) => {
    return await Review.findByIdAndUpdate(
        id,
        { title, content, rating },
        { new: true }
    );
};