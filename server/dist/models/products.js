import { Schema, model } from "mongoose";
import { reviewSchema } from "./Review.js";
const productSchema = new Schema({
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
}, {
    toJSON: { getters: true },
    toObject: { getters: true },
});
const Product = model("Product", productSchema);
export default Product;
