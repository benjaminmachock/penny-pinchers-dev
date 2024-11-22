import db from "../config/connection.js";
import { Customer, Product } from "../models/index.js";
import customerSeeds from "./customerData.json" with { type: "json" };
import productSeeds from "./productData.json" with { type: "json" };
import cleanDB from "./cleanDB.js";
const seedDatabase = async () => {
    try {
        await db();
        await cleanDB();
        await Customer.insertMany(customerSeeds);
        console.log(" Customer seeding completed successfully!");
        await Product.insertMany(productSeeds);
        console.log("Product seeding completed successfully!");
        process.exit(0);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error seeding database:", err.message);
        }
        else {
            console.error("Unknown error seeding database");
        }
        process.exit(1);
    }
};
seedDatabase();
