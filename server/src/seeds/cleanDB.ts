import { Customer, Product, Review } from "../models/index.js";
import process from "process";

const cleanDB = async (): Promise<void> => {
  try {
    await Customer.deleteMany({});
    console.log("Customer collection cleaned.");
    await Product.deleteMany({});
    console.log("Product collection cleaned.");
    await Review.deleteMany({});
    console.log("Review collection cleaned.");
  } catch (err: unknown) {
    console.error("Error cleaning collections:", err);
    process.exit(1);
  }
};

export default cleanDB;
