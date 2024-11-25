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
            console.log(populatedCart?.items);
            return populatedCart;
            // populatedCart?.items.forEach((item, index) => {
            //   console.log(`Item ${index} product:`, item.product);
            // });
            // const normalizedItems = populatedCart?.items.map((item) => ({
            //   ...item.toObject(), // Convert to plain JS object
            //   product: Array.isArray(item.product)
            //     ? item.product.map((p) => p.toObject()) // Handle array of populated objects
            //     : item.product.toObject(), // Handle single populated object
            // }));
            // console.log("normalizedItems:", normalizedItems);
            // return { ...populatedCart?.toObject(), items: normalizedItems };
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
        addToCart: async (_parent, { productId, userId, quantity, }) => {
            //find customer and push products to cart
            const customer = await Customer.findById(userId);
            const product = await Product.findById(productId);
            if (!customer)
                throw new AuthenticationError("No User Found");
            if (!product)
                throw new AuthenticationError("No Product Found");
            //find users cart
            let cart = await Cart.findOne({ user: userId });
            if (!cart) {
                cart = new Cart({ customer: userId, items: [] });
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
