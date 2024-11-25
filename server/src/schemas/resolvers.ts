import { Customer, Product } from "../models/index.js";
import { signToken, AuthenticationError, ProductError } from "../utils/auth.js";

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
  product?: Product;
}

interface Product {
  _id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

interface ProductArgs {
  productId: string;
}

interface AddProductArgs {
  input: {
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
  };
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

    products: async (): Promise<Product[]> => {
      return await Product.find();
    },

    product: async (
      _parent: unknown,
      { productId }: ProductArgs
    ): Promise<Product | null> => {
      const product = await Product.findOne({ _id: productId });
      console.log(productId);
      console.log(product);
      return await Product.findOne({ _id: productId });
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

    addProduct: async (
      _parent: unknown,
      { input }: AddProductArgs
    ): Promise<{ product: Product }> => {
      const product = await Product.create({ ...input });

      return { product };
    },

    removeProduct: async (
      _parent: unknown,
      _args: unknown,
      context: Context
    ): Promise<Product | null> => {
      if (context.product) {
        return await Product.findOneAndDelete({ _id: context.product._id });
      }

      throw new ProductError("Could not find product");
    },
  },
};

export default resolvers;
