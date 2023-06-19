import {Router} from "express";
import passport from "passport";
import {recover} from "../middlewares/recover.js";
import {passportCallback} from "../utils.js";
import * as sessionController from "../controller/session.controller.js";
import {auth} from "../middlewares/auth.js";

const router = Router();


router.get(
  "/github",
  passport.authenticate("github", {scope: ["user:email"]}),
  sessionController.github
);



router.get("/githubcallback",
  passport.authenticate("github", {failureRedirect: "/login", session: false}),
  sessionController.githubCallback
);



router.post("/register",
  passportCallback("register"),
  sessionController.register
);



router.post("/login", passportCallback("login"), sessionController.login);



router.post("/logout",
  auth(["user", "premium", "admin"]),
  sessionController.logout
);



router.post("/recover", sessionController.recover);



router.post(
  "/recoverPassword/:token",
  recover,
  sessionController.recoverPassword
);



router.get("/current", passportCallback("jwt"), sessionController.current);

export default router;
