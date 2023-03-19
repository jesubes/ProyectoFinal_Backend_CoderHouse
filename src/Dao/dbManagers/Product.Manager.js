import productsModel from "../models/products.Schema.js";

export default class ProductsManager {
  constructor() {
    console.log("Trabajando sobre mongoDB Atlas ProductsManager!!!");
  }

  getAll = async () => {
    const products = await productsModel.find().lean(); //tambien find()
    return products; //products.map(product=> user.toObject())
  };

  saveProduct = async (product) => {
    let result = await productsModel.create(product);
    return result;
  };

  updateProduct = async (id) => {
    let result = await productsModel.updateOne({ _id: id });
    return result;
  };
}
