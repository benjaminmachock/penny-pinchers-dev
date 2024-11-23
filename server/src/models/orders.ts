import { Schema, model, Document } from "mongoose";

interface iOrder extends Document {
  _id: string;
  customerID: string;
  productID: string;
  shipped: boolean;
}

const orderSchema = new Schema<iOrder>(
  {
    customerID: {
      type: String,
    },
    productID: {
      type: String,
    },
    shipped: {
      type: Boolean,
    },
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Order = model<iOrder>("Order", orderSchema);

export default Order;
