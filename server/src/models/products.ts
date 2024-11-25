import { Schema, model, Document } from "mongoose";

interface iProduct extends Document {
  _id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
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
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Product = model<iProduct>("Product", productSchema);

export default Product;
