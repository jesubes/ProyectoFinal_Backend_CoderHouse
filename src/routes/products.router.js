import {Router} from "express";
import * as productsController from "../controller/products.controller.js";
import {auth} from "../middlewares/auth.js";

const router = Router();

router.get("/?", productsController.getAll);

router.get("/:pid", productsController.getById);

router.post("/", productsController.post);

router.put("/:pid", productsController.putById);

router.delete("/:pid", productsController.deleteById);

export default router;
