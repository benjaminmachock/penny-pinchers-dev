import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const customerSchema = new Schema({
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
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
});
customerSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
customerSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
const Customer = model("Customer", customerSchema);
export default Customer;
