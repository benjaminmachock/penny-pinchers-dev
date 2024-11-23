import { Schema, model, Document } from "mongoose";

interface iCart extends Document {
  _id: string;
  productId: string;
  orderId: string;
}

const cartSchema = new Schema<iCart>(
  {
    productId: {
      type: String,
    },
    orderId: {
      type: String,
    },
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Cart = model<iCart>("Cart", cartSchema);

export default Cart;
