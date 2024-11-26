import { Schema, model, Document, Types } from "mongoose";

interface Cart extends Document {
  _id: string;
  customer: Types.ObjectId;
  items: CartItem[];
}
interface CartItem extends Document {
  _id: string;
  product: Types.ObjectId;
  quantity: number;
}

const cartItemSchema = new Schema<CartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new Schema<Cart>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    items: [cartItemSchema],
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

cartSchema.pre("findOne", function () {
  this.populate("items.product");
});

const Cart = model<Cart>("Cart", cartSchema);

export default Cart;
