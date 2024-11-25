import { Customer, Product, Cart } from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";
const resolvers = {
    Query: {
        customers: async () => {
            return await Customer.find();
        },
        customer: async (_parent, { customerId }) => {
            return await Customer.findOne({ _id: customerId });
        },
        viewCart: async (_parent, { cartId }) => {
            const cart = await Cart.findById(cartId);
            const populatedCart = await cart?.populate({
                path: "items.product",
            });
            return populatedCart;
        },
        me: async (_parent, _args, context) => {
            if (context.user) {
                return await Customer.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError("Not Authenticated");
        },
    },
    Mutation: {
        addCustomer: async (_parent, { input }) => {
            const customer = await Customer.create({ ...input });
            const token = signToken(customer.username, customer.email, customer._id);
            return { customer, token };
        },
        addToCart: async (_parent, { productId, customerId, quantity, }) => {
            //find customer and push products to cart
            const customer = await Customer.findById(customerId);
            const product = await Product.findById(productId);
            if (!customer)
                throw new AuthenticationError("No User Found");
            if (!product)
                throw new AuthenticationError("No Product Found");
            //find users cart
            let cart = await Cart.findOne({ user: customerId });
            if (!cart) {
                cart = new Cart({ customer: customerId, items: [] });
            }
            const cartItem = cart.items.find((item) => item.product.equals(productId));
            if (cartItem) {
                cartItem.quantity += quantity;
            }
            else {
                cart.items.push({ product: productId, quantity });
            }
            await cart.save();
            const populatedCart = await cart.populate({ path: "items.product" });
            return populatedCart;
        },
        removeFromCart: async (_parent, { userId, productId, quantity, }) => {
            const customer = await Customer.findById(userId);
            if (!customer)
                throw new AuthenticationError("No User Found");
            const product = await Product.findById(productId);
            if (!product)
                throw new AuthenticationError("No Product Found");
            let cart = await Cart.findOne({ customer: userId });
            if (!cart) {
                throw new AuthenticationError("No Cart Found");
            }
            const cartItem = cart.items.find((item) => item.product.equals(productId));
            if (!cartItem) {
                throw new Error("Product not found in cart");
            }
            if (cartItem.quantity <= quantity) {
                cart.items = cart.items.filter((item) => !item.product.equals(productId));
            }
            else {
                cartItem.quantity -= quantity;
            }
            const updatedCart = await cart.save();
            console.log(updatedCart.items);
            const populatedCart = await updatedCart.populate({
                path: "items.product",
            });
            return populatedCart;
        },
        login: async (_parent, { email, password }) => {
            const customer = await Customer.findOne({ email });
            if (!customer) {
                throw AuthenticationError;
            }
            const correctPw = await customer.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Not Authenticated");
            }
            const token = signToken(customer.username, customer.email, customer._id);
            return { token, customer };
        },
        removeCustomer: async (_parent, _args, context) => {
            if (context.user) {
                return await Customer.findOneAndDelete({ _id: context.user._id });
            }
            throw new AuthenticationError("Could not find user");
        },
    },
};
export default resolvers;
