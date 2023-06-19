import {Router} from "express";
import * as ticketsController from "../controller/tickets.controller.js";
import {auth} from "../middlewares/auth.js";

const router = Router();

router.get("/", ticketsController.getAll);

router.get("/:tid", ticketsController.getById);

router.post("/", ticketsController.post);


export default router;
