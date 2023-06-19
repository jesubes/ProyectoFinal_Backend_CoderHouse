import {Router} from "express";
import viewsRouter from "./views.router.js";
import sessionRouter from "./session.router.js";
import productsRoutes from "./products.router.js";
import cartsRoutes from "./carts.router.js";
import ticketsRoutes from "./tickets.router.js";
import usersRoutes from "./users.router.js";
import mockingRoutes from "./mocking-products.router.js";

const router = new Router();

router.use("/", viewsRouter);
router.use("/api/session", sessionRouter);
router.use("/api/products", productsRoutes);
router.use("/api/carts", cartsRoutes);
router.use("/api/tickets", ticketsRoutes);
router.use("/api/users", usersRoutes);
router.use("/mockingproducts", mockingRoutes);

export default router;
