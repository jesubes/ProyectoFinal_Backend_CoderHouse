import {Cookie} from "express-session";
import passport from "passport";

export const auth = (roles) =>
  function (req, res, next) {
    passport.authenticate("jwt", function (error, user, info) {
      req.user = user;
    })(req, res, next);
    if (roles.includes(req.user.role)) return next();
    return res.send({status: "error", error: "Unauthorized"});
  };
