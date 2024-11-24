import { Customer, Product, Cart } from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

interface Customer {
  _id: string;
  username: string;
  email: string;
  password: string;
}

interface CustomerArgs {
  customerId: string;
}

interface AddCustomerArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface Context {
  user?: Customer;
}

const resolvers = {
  Query: {
    customers: async (): Promise<Customer[]> => {
      return await Customer.find();
    },

    customer: async (
      _parent: unknown,
      { customerId }: CustomerArgs
    ): Promise<Customer | null> => {
      return await Customer.findOne({ _id: customerId });
    },

    me: async (
      _parent: unknown,
      _args: unknown,
      context: Context
    ): Promise<Customer | null> => {
      if (context.user) {
        return await Customer.findOne({ _id: context.user._id });
      }

      throw new AuthenticationError("Not Authenticated");
    },
  },

  Mutation: {
    addCustomer: async (
      _parent: unknown,
      { input }: AddCustomerArgs
    ): Promise<{ token: string; customer: Customer }> => {
      const customer = await Customer.create({ ...input });

      const token = signToken(customer.username, customer.email, customer._id);

      return { customer, token };
    },

    addToCart: async (
      _parent: unknown,
      {
        productId,
        userId,
        quantity,
      }: { userId: string; productId: string; quantity: number }
    ) => {
      //find customer and push products to cart
      const customer = await Customer.findById(userId);
      const product = await Product.findById(productId);

      if (!customer) throw new AuthenticationError("No User Found");
      if (!product) throw new AuthenticationError("No Product Found");

      //find users cart
      let cart = await Cart.findOne({ user: userId });

      if (!cart) {
        cart = new Cart({ customer: userId, items: [] });
      }

      const cartItem = cart.items.find((item) =>
        item.product.equals(productId)
      );

      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity } as any);
      }

      await cart.save();

      return cart.populate("items.product");
    },

    login: async (
      _parent: unknown,
      { email, password }: { email: string; password: string }
    ): Promise<{ token: string; customer: Customer }> => {
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

    removeCustomer: async (
      _parent: unknown,
      _args: unknown,
      context: Context
    ): Promise<Customer | null> => {
      if (context.user) {
        return await Customer.findOneAndDelete({ _id: context.user._id });
      }

      throw new AuthenticationError("Could not find user");
    },
  },
};

export default resolvers;
