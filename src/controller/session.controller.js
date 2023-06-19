import {CartsService, UsersService} from "../dao/repositories/index.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import {createHash, isCorrect} from "../utils.js";
import config from "../config/config.js";
import ClientUser from "../dao/DTOs/ClientUser.js";
import CustomError from "../errors/customError.js";





const transport = nodemailer.createTransport({
  service: "gmail",
  port: 5087,
  auth: {
    user: "jesubes@gmail.com",
    pass: "pabsrnzqnaerhpps",
  },
});



export const github = (req, res) => {};




export const githubCallback = (req, res) => {
  try {
    const token = jwt.sign(req.user, config.cookieSecret, {
      expiresIn: "1h",
    });
    res.cookie("coderCookieToken", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};





export const register = (req, res, next) => {
  try {
    return res.send({
      status: 200,
      message: "User registered",
    });
  } catch (error) {
    next(error);
  }
};




export const login = async (req, res, next) => {
  try {
    const token = jwt.sign(req.user, config.cookieSecret, {
      expiresIn: "1h",
    });
    res.cookie("coderCookieToken", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });
    res.send({
      status: 200,
      message: "Login success",
    });
  } catch (error) {
    next(error);
  }
};




export const logout = async (req, res, next) => {
  try {
    const cartId = req.user.cartId;

    const deleteCartResponse = await CartsService.deleteById(cartId);
    if (deleteCartResponse.error) return deleteCartResponse;

    const userUpdateResponse = await UsersService.putBy(
      {_id: req.user._id},
      {cartId: [], lastConnection: new Date().toLocaleString()}
    );
    if (userUpdateResponse.error) return userUpdateResponse;

    return res
      .clearCookie("coderCookieToken")
      .send({status: 200, message: "Logout success"});
  } catch (error) {
    next(error);
  }
};





export const recover = async (req, res, next) => {
  try {
    const {email} = req.body;
    if (!email)
      return res.status(400).send({status: 404, error: "Incomplete values"});

    const getUser = await UsersService.getBy({email});
    if (getUser.error)
      return res.status(404).send({status: 404, error: "Email not registered"});

    const token = jwt.sign({email}, config.cookieSecret, {
      expiresIn: 1000 * 60 * 60,
    });

    await transport.sendMail({
      from: "jesubes@gmail.com",
      to: `${email}`,
      subject: "Correo de recuperacion",
      html: `<a href="http://localhost:8080/recoverPassword/${token}">Cambiar contraseña</a>`,
    });

    return res.send({status: 200, message: "Password updated"});
  } catch (error) {
    next(error);
  }
};





export const recoverPassword = async (req, res, next) => {
  try {
    const token = req.token;
    const {password} = req.body;

    if (!password)
      return res.status(400).send({status: 404, error: "Incomplete values"});

    const user = await UsersService.getBy({email: token.email});
    const isIdentic = isCorrect(user, password);

    if (isIdentic) return res.send({status: 404, error: "Write new password"});

    const putResponse = await UsersService.putBy(
      {email: token.email},
      {password: createHash(password)}
    );
    if (putResponse.error) CustomError.create({...putResponse});

    return res.send({status: "success", message: "Password updated"});
  } catch (error) {
    next(error);
  }
};





export const current = (req, res, next) => {
  try {
    const user = new ClientUser(req.user);
    return res.send(user);
  } catch (error) {
    next(error);
  }
};
