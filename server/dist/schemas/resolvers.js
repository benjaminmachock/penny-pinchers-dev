import { Customer, Product } from "../models/index.js";
import { signToken, AuthenticationError, ProductError } from "../utils/auth.js";
const resolvers = {
    Query: {
        customers: async () => {
            return await Customer.find();
        },
        customer: async (_parent, { customerId }) => {
            return await Customer.findOne({ _id: customerId });
        },
        me: async (_parent, _args, context) => {
            if (context.user) {
                return await Customer.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError("Not Authenticated");
        },
        products: async () => {
            return await Product.find();
        },
        product: async (_parent, { productId }) => {
            const product = await Product.findOne({ _id: productId });
            console.log(productId);
            console.log(product);
            return await Product.findOne({ _id: productId });
        },
    },
    Mutation: {
        addCustomer: async (_parent, { input }) => {
            const customer = await Customer.create({ ...input });
            const token = signToken(customer.username, customer.email, customer._id);
            return { customer, token };
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
        addProduct: async (_parent, { input }) => {
            const product = await Product.create({ ...input });
            return { product };
        },
        removeProduct: async (_parent, _args, context) => {
            if (context.product) {
                return await Product.findOneAndDelete({ _id: context.product._id });
            }
            throw new ProductError("Could not find product");
        },
    },
};
export default resolvers;
