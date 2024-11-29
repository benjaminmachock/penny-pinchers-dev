import { Customer, Product, Review, Cart } from "../models/index.js";

import {
  signToken,
  AuthenticationError,
  ProductError,
  ReviewError,
} from "../utils/auth.js";

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
  review?: Review;
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

interface Review {
  _id: string;
  reviewText: string;
  rating: number;
}

interface ReviewArgs {
  reviewId: string;
}

interface AddReviewArgs {
  input: {
    reviewText: string;
    rating: number;
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

    viewCart: async (_parent: unknown, { cartId }: { cartId: string }) => {
      const cart = await Cart.findById(cartId);

      const populatedCart = await cart?.populate({
        path: "items.product",
      });

      return populatedCart;
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
      try {
        const products = await Product.find();
        return products;
      } catch (err) {
        console.log(err);

        throw new Error("Could not find products");
      }
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

    reviews: async (): Promise<Review[]> => {
      return await Review.find();
    },

    review: async (
      _parent: unknown,
      { reviewId }: ReviewArgs
    ): Promise<Review | null> => {
      return await Review.findOne({ _id: reviewId });
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
        customerId,
        quantity,
      }: { customerId: string; productId: string; quantity: number }
    ) => {
      const customer = await Customer.findById(customerId);
      const product = await Product.findById(productId);

      if (!customer) throw new AuthenticationError("No User Found");
      if (!product) throw new AuthenticationError("No Product Found");

      let cart = await Cart.findOne({ user: customerId });

      if (!cart) {
        cart = new Cart({ customer: customerId, items: [] });
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

      const populatedCart = await cart.populate({ path: "items.product" });

      return populatedCart;
    },

    removeFromCart: async (
      _parent: unknown,
      {
        userId,
        productId,
        quantity,
      }: { userId: string; productId: string; quantity: number }
    ) => {
      const customer = await Customer.findById(userId);
      if (!customer) throw new AuthenticationError("No User Found");

      const product = await Product.findById(productId);
      if (!product) throw new AuthenticationError("No Product Found");

      let cart = await Cart.findOne({ customer: userId });
      if (!cart) {
        throw new AuthenticationError("No Cart Found");
      }

      const cartItem = cart.items.find((item) =>
        item.product.equals(productId)
      );

      if (!cartItem) {
        throw new Error("Product not found in cart");
      }

      if (cartItem.quantity <= quantity) {
        cart.items = cart.items.filter(
          (item) => !item.product.equals(productId)
        );
      } else {
        cartItem.quantity -= quantity;
      }

      const updatedCart = await cart.save();
      console.log(updatedCart.items);

      const populatedCart = await updatedCart.populate({
        path: "items.product",
      });

      return populatedCart;
    },

    login: async (
      _parent: unknown,
      { email, password }: { email: string; password: string }
    ): Promise<{ token: string; customer: Customer }> => {
      const customer = await Customer.findOne({ email });
      // console.log(customer);
      if (!customer) {
        throw AuthenticationError;
        console.log("No customer found");
      }

      const correctPw = await customer.isCorrectPassword(password);
      console.log(correctPw);
      if (!correctPw) {
        throw new AuthenticationError("Not Authenticated");
        console.log("Incorrect password");
      }

      const token = signToken(customer.username, customer.email, customer._id);
      console.log(token);
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

    addReview: async (
      _parent: unknown,
      { input }: AddReviewArgs
    ): Promise<{ review: Review }> => {
      const review = await Review.create({ ...input });

      return { review };
    },

    removeReview: async (
      _parent: unknown,
      _args: unknown,
      context: Context
    ): Promise<Review | null> => {
      if (context.review) {
        return await Review.findOneAndDelete({ _id: context.review._id });
      }
      throw new ReviewError("Could not find review");
    },
  },
};

export default resolvers;
