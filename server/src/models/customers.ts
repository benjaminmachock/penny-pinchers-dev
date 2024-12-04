import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

interface iCustomer extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

const customerSchema = new Schema<iCustomer>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

customerSchema.pre<iCustomer>("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

customerSchema.methods.isCorrectPassword = async function (
  password: string
): Promise<boolean> {
  console.log(password, this.password);
  return password === this.password;
  //   return bcrypt.compare(password, this.password);
};

const Customer = model<iCustomer>("Customer", customerSchema);

export default Customer;
