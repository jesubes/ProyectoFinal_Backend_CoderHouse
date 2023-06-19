import {Router} from "express";
import {recover} from "../middlewares/recover.js";
import * as viewsController from "../controller/views.controller.js";
import {auth} from "../middlewares/auth.js";

const router = Router();

router.get("/", viewsController.home);

router.get("/chat", auth(["user", "premium"]), viewsController.chat);

router.get("/products?", viewsController.products);

router.get("/cart", auth(["user", "premium", "admin"]), viewsController.cart);

router.get("/register", viewsController.register);

router.get("/login", viewsController.login);

router.get("/recover", viewsController.recover);

router.get("/recoverPassword/:token", recover, viewsController.recoverPassword);

router.get( "/profile", auth(["user", "premium", "admin"]), viewsController.profile);

router.get("/loggerTest", viewsController.loggerTest);

router.get("/admin",auth(["admin"]), viewsController.admin);

export default router;
