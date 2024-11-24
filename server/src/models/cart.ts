import { Schema, model, Document, Types } from "mongoose";

interface Cart extends Document {
  _id: string;
  customer: Types.ObjectId;
  items: CartItem[];
  totalPrice: number;
  paymentStatus: "processed" | "failed";
  stripeSessionId?: string;
}
interface CartItem extends Document {
  _id: string;
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

const cartItemSchema = new Schema<CartItem>({
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
});

const cartSchema = new Schema<Cart>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    stripeSessionId: { type: String },
    paymentStatus: {
      type: String,
      values: ["processed", "failed"],
    },
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Cart = model<Cart>("Cart", cartSchema);

export default Cart;
