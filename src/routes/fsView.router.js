import express from "express";
import ProductsManager from "../ProductManager.js";

const router = express.Router();

const productsM = new ProductsManager("./src/productos.json");

router.get("/", async (req, res) => {
  const dbProducts = await productsM.getProducts();

  res.render("home", { dbProducts: dbProducts });
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realtimeProducts");
});

export default router;
