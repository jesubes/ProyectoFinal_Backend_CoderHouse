import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: Number,
    password: String,
    cartId: {
      type: [
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "carts",
        },
      ],
      default: [],
    },
    role: {
      type: String,
      enum: ["user", "premium", "admin"],
      default: "user",
    },
    documents: [
      {
        name: {
          type: String,
          default: "",
        },
        reference: {
          type: String,
          default: "",
        },
      },
    ],
    lastConnection: String,
  },
  {versionKey: false}
);

const userModel = mongoose.model(usersCollection, userSchema);
export default userModel;
