import db from "../config/connection.js";
import { Customer } from "../models/index.js";
import customerSeeds from "./customerData.json" assert { type: "json" };
import cleanDB from "./cleanDB";

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    await Customer.insertMany(customerSeeds);

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error seeding database:", err.message);
    } else {
      console.error("Unknown error seeding database");
    }
    process.exit(1);
  }
};

seedDatabase();
