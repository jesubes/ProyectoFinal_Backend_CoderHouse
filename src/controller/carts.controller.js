import {CartsService} from "../dao/repositories/index.js";
import customError from "../errors/customError.js";
import {enumErrors} from "../errors/enumErrors.js";

export const getAll = async (req, res, next) => {
  try {
    const getResponse = await CartsService.getAll();
    if (getResponse.error) customError.create({...getResponse});

    req.logger.http("statusCode: " + getResponse.status);
    return res.send(getResponse);
  } catch (error) {
    next(error);
  }
};


export const getById = async (req, res, next) => {
  try {
    const id = req.params.cid;
    if (id.length !== 24)
      customError.create({
        name: "Invalid id",
        cause: "The length of id is incorrect",
        message: "Send id of 24 characters",
        code: enumErrors.INVALID_REQUEST,
        statusCode: 400,
      });

    const getResponse = await CartsService.getById(id);
    if (getResponse.error) customError.create({...getResponse});

    req.logger.http("statusCode: " + getResponse.status);
    return res.send(getResponse);
  } catch (error) {
    next(error);
  }
};


export const post = async (req, res, next) => {
  try {
    const {products} = req.body;

    if (!products) {
      const postResponse = await CartsService.post();
      if (postResponse.error) customError.create({...postResponse});

      req.logger.http("statusCode: " + postResponse.status);
      return res.send(postResponse);
    }

    if (!Array.isArray(products))
      customError.create({
        name: "Error when trying update product of cart",
        message: "Send an array of products",
        cause: "The value received is different of array",
        code: enumErrors.UNEXPECTED_VALUE,
        statusCode: 400,
      });

    const validProducts = products.every((product) => {
      const keys = Object.keys(product);
      return (
        keys.length === 2 && keys.includes("pid") && keys.includes("quantity")
      );
    });

    if (!validProducts)
      customError.create({
        statusCode: 400,
        name: "Object invalid",
        cause: "The schema of product is invalid",
        message: "review the schematic of the shipped products and try again",
        code: enumErrors.INVALID_REQUEST,
      });

    const postResponse = await CartsService.post(products);
    if (postResponse.error) customError.create({...postResponse});

    req.logger.http("statusCode: " + postResponse.status);
    return res.send(postResponse);
  } catch (error) {
    next(error);
  }
};


export const postProductToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const {cid, pid} = req.params;

    if (cid.length !== 24 || pid.length !== 24)
      customError.create({
        name: "Invalid id",
        cause: "The length of id is incorrect",
        message: "Send id of 24 characters",
        code: enumErrors.INVALID_REQUEST,
        statusCode: 400,
      });

    const postResponse = await CartsService.postProductToCart(cid, pid, user);
    if (postResponse.error) customError.create({...postResponse});

    req.logger.http("statusCode: " + postResponse.status);
    return res.send(postResponse);
  } catch (error) {
    next(error);
  }
};


export const putProducts = async (req, res, next) => {
  try {
    const {products} = req.body;
    const cid = req.params.cid;

    if (cid.length !== 24)
      customError.create({
        name: "Invalid id",
        cause: "The length of id is incorrect",
        message: "Send id of 24 characters",
        code: enumErrors.INVALID_REQUEST,
        statusCode: 400,
      });

    if (!products)
      customError.create({
        name: "Products is undefined",
        message: "Send an array of products",
        cause: "Products not shipped",
        statusCode: 400,
        code: enumErrors.INVALID_REQUEST,
      });

    if (!Array.isArray(products))
      customError.create({
        name: "Error when trying update product of cart",
        message: "Send an array of products",
        cause: "The value received is different of array",
        code: enumErrors.UNEXPECTED_VALUE,
        statusCode: 400,
      });

    const validProducts = products.every((product) => {
      const keys = Object.keys(product);
      return (
        keys.length === 2 && keys.includes("pid") && keys.includes("quantity")
      );
    });

    if (!validProducts)
      customError.create({
        statusCode: 400,
        name: "Object invalid",
        cause: "The schema of product is invalid",
        message: "review the schematic of the shipped products and try again",
        code: enumErrors.INVALID_REQUEST,
      });

    const putResponse = await CartsService.putProducts(cid, products);
    if (putResponse.error) customError.create({...putResponse});

    req.logger.http("statusCode: " + putResponse.status);
    return res.send(putResponse);
  } catch (error) {
    next(error);
  }
};


export const putProductQuantity = async (req, res, next) => {
  try {
    const {quantity} = req.body;
    const {cid, pid} = req.params;

    if (cid.length !== 24 || pid.length !== 24)
      customError.create({
        name: "Invalid id",
        cause: "The length of id is incorrect",
        message: "Send id of 24 characters",
        code: enumErrors.INVALID_REQUEST,
        statusCode: 400,
      });

    if (!quantity)
      customError.create({
        name: "Missing values",
        cause: "I miss sending the value of quantity",
        message: "Send the quantity",
        statusCode: 400,
        code: enumErrors.MISSING_VALUES,
      });

    if (typeof quantity !== "number")
      customError.create({
        name: "Error when trying update quantity from product",
        message: "Send number value of quantity",
        cause: "The value received is different of number",
        code: enumErrors.UNEXPECTED_VALUE,
        statusCode: 400,
      });

    const putResponse = await CartsService.putProductQuantity(
      cid,
      pid,
      quantity
    );
    if (putResponse.error) customError.create({...putResponse});

    req.logger.http("statusCode: " + putResponse.status);
    return res.send(putResponse);
  } catch (error) {
    next(error);
  }
};


export const deleteProductToCart = async (req, res, next) => {
  try {
    const {cid, pid} = req.params;

    if (cid.length !== 24 || pid.length !== 24)
      customError.create({
        name: "Invalid id",
        cause: "The length of id is incorrect",
        message: "Send id of 24 characters",
        code: enumErrors.INVALID_REQUEST,
        statusCode: 400,
      });

    const deleteResponse = await CartsService.deleteProductToCart(cid, pid);
    if (deleteResponse.error) customError.create({...deleteResponse});

    req.logger.http("statusCode: " + deleteResponse.status);
    return res.send(deleteResponse);
  } catch (error) {
    next(error);
  }
};


export const deleteProducts = async (req, res, next) => {
  try {
    const cid = req.params.cid;
    if (cid.length !== 24)
      customError.create({
        name: "Invalid id",
        cause: "The length of id is incorrect",
        message: "Send id of 24 characters",
        code: enumErrors.INVALID_REQUEST,
        statusCode: 400,
      });

    const deleteResponse = await CartsService.deleteProducts(cid);
    if (deleteResponse.error) customError.create({...deleteResponse});

    req.logger.http("statusCode: " + deleteResponse.status);
    return res.send(deleteResponse);
  } catch (error) {
    next(error);
  }
};


export const deleteById = async (req, res, next) => {
  try {
    const cid = req.params.cid;
    if (cid.length !== 24)
      customError.create({
        name: "Invalid id",
        cause: "The length of id is incorrect",
        message: "Send id of 24 characters",
        code: enumErrors.INVALID_REQUEST,
        statusCode: 400,
      });

    const deleteResponse = await CartsService.deleteById(cid);
    if (deleteResponse.error) customError.create({...deleteResponse});

    req.logger.http("statusCode: " + deleteResponse.status);
    return res.send(deleteResponse);
  } catch (error) {
    next(error);
  }
};

export const purchase = async (req, res, next) => {
  try {
    //const purchaser = req.user.email;
    const cid = req.params.cid;
    if (cid.length !== 24)
      customError.create({
        name: "Invalid id",
        cause: "The length of id is incorrect",
        message: "Send id of 24 characters",
        code: enumErrors.INVALID_REQUEST,
        statusCode: 400,
      });

    const purchaseResponse = await CartsService.purchase(cid);
    if (purchaseResponse.error) customError.create({...purchaseResponse});

    req.logger.http("statusCode: " + purchaseResponse.status);
    return res.send(purchaseResponse);
  } catch (error) {
    next(error);
  }
};
