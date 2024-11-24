import { Schema, model, Document } from "mongoose";
import { reviewSchema } from "./Review.js";
import type { iReview } from "./Review.js";

interface iProduct extends Document {
  _id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  reviews: iReview[];
  rating: number;
}

const productSchema = new Schema<iProduct>(
  {
    title: {
      type: String,
    },
    price: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
    },
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Product = model<iProduct>("Product", productSchema);

export default Product;
