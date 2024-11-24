import { Customer, Product } from "../models/index.js";
import process from "process";
const cleanDB = async () => {
    try {
        await Customer.deleteMany({});
        console.log("Customer collection cleaned.");
        await Product.deleteMany({});
        console.log("Product collection cleaned");
    }
    catch (err) {
        console.error("Error cleaning collections:", err);
        process.exit(1);
    }
};
export default cleanDB;