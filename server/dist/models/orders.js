import { Schema, model } from "mongoose";
const orderSchema = new Schema({
    customerID: {
        type: String,
    },
    productID: {
        type: String,
    },
    shipped: {
        type: Boolean,
    },
}, {
    toJSON: { getters: true },
    toObject: { getters: true },
});
const Order = model("Order", orderSchema);
export default Order;
