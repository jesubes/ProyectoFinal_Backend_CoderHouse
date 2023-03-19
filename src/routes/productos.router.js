import {Router} from "express";
import ProductsManager from "../Dao/dbManagers/Product.Manager.js";

const router = Router();

const productsManager = new ProductsManager();

router.get("/", async (request, response) => {
  let productos = await productsManager.getAll();
  response.send({ status: "success", payload: productos });
});

router.post("/", async (request, response) => {
  const { title, desciption, code, price, stock, category, thumbnail, id } =
    request.body;

  let newProduct = {
    title,
    desciption,
    code,
    price,
    stock,
    category,
    thumbnail,
    id,
  };

  const result = await productsManager.saveProduct(newProduct);

  response.send({ status: "success", payload: result });
});

export default router;
