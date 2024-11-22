import { Schema, model, Document } from "mongoose";

interface iOrder extends Document {
  _id: string;
  customerID: string;
  productsID: string;
  shipped: boolean;
}

const orderSchema = new Schema<iOrder>(
  {
    customerID: {
      type: String,
    },
    productsID: {
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
