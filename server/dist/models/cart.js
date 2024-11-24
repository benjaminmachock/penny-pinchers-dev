import { Schema, model } from "mongoose";
const cartSchema = new Schema({
    productId: {
        type: String,
    },
    orderId: {
        type: String,
    },
}, {
    toJSON: { getters: true },
    toObject: { getters: true },
});
const Cart = model("Cart", cartSchema);
export default Cart;
