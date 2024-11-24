import { Schema, model } from "mongoose";
const cartItemSchema = new Schema({
    product: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    ],
    quantity: { type: Number, required: true, min: 1 },
});
const cartSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    items: [cartItemSchema],
}, {
    toJSON: { getters: true },
    toObject: { getters: true },
});
const Cart = model("Cart", cartSchema);
export default Cart;