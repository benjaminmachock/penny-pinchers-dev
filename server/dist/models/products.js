import { Schema, model } from "mongoose";
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
}, {
    toJSON: { getters: true },
    toObject: { getters: true },
});
const Product = model("Product", productSchema);
export default Product;
