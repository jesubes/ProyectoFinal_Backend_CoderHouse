import mongoose from "mongoose";

const cartCollection = "carts";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      pid: Number,
      quantity: Number,
    },
  ],
  id: Number,
});

const cartsModel = mongoose.model(cartCollection, cartsSchema);
export default cartsModel;
