import cartsModel from "../models/carts.Schema.js";

export default class CartsManager {
  constructor() {
    console.log("Trabajando sobre mongoDB Atlas en Carts");
  }

  getAll = async () => {
    const carts = await cartsModel.find();
    return carts.map((product) => user.toObject());
  };

  saveCart = async (cart) => {
    let result = await cartsModel.create(cart);
    return result;
  };

  updateCart = async (id) => {
    let result = await cartsModel.updateOne({ _id: id });
    return result;
  };
}


