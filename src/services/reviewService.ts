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
