import { Router } from "express";
import CartsManager from "../Dao/dbManagers/Cart.Manager.js";

const router = Router();
const cartsM = new CartsManager();

router.get("/", async (request) => {
  let carts = await cartsM.getAll();
  response.send({ status: "success", payload: carts });
});

router.post("/", async (request, response) => {
  const { products, id } = request.body;

  let productToCar = { products, id };
  let result = await cartsM.saveCart(productToCar);

  response.send({ status: "success", payload: result });
});

export default router