import { Schema, model, Document } from "mongoose";

interface iReview extends Document {
  _id: string;
  reviewText: string;
  rating: number;
}

const reviewSchema = new Schema<iReview>(
  {
    reviewText: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Review = model<iReview>("Review", reviewSchema);

export default Review;
