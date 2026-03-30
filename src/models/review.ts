import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
    title: string;
    content: string;
    rating: number;
    createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IReview>("Review", ReviewSchema);
