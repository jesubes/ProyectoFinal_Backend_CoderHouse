import {ProductsService} from "../dao/repositories/index.js";
import customError from "../errors/customError.js";
import {enumErrors} from "../errors/enumErrors.js";

export const getAll = async (req, res, next) => {
  try {
    let {query, limit, page, sort} = req.query;

    if (query) {
      if (!query.startsWith('{"') || !query.endsWith('"}'))
        customError.create({
          name: "Invalid value",
          message: "Send JSON for filter",
          cause: "The JSON is invalid",
          statusCode: 400,
          code: enumErrors.INVALID_FILTER,
        });
      query = JSON.parse(query);
    }
    if (limit) limit = +limit;
    if (page) page = +page;
    if (sort) sort = +sort;

    const getResponse = await ProductsService.getAll(query, limit, page, sort);
    if (getResponse.error) customError.create({...getResponse});

    req.logger.http("statusCode: " + getResponse.status);
    return res.send(getResponse);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const id = req.params.pid;
    if (id.length !== 24)
      customError.create({
        name: "Invalid id",
        cause: "The length of id is incorrect",
        message: "Send id of 24 characters",
        code: enumErrors.INVALID_REQUEST,
        statusCode: 400,
      });

    const getResponse = await ProductsService.getById(id);
    if (getResponse.error) customError.create({...getResponse});

    req.logger.http("statusCode: " + getResponse.status);
    return res.send(getResponse);
  } catch (error) {
    next(error);
  }
};

export const post = async (req, res, next) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status = true,
      stock,
      category,
      thumbnails,
      owner = admin,
    } = req.body;

    const product = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
      owner,
    };

    if (Object.values(product).includes(undefined))
      customError.create({
        name: "Missing values",
        message: "Fill all required fields",
        cause: "Some field was not defined",
        statusCode: 404,
        code: enumErrors.MISSING_VALUES,
      });

    const postResponse = await ProductsService.post(product);
    if (postResponse.error) customError.create({...postResponse});

    req.logger.http("statusCode: " + postResponse.status);
    return res.send(postResponse);
  } catch (error) {
    next(error);
  }
};

export const putById = async (req, res, next) => {
  try {
    const id = req.params.pid;
    if (id.length !== 24)
      customError.create({
        name: "Invalid id",
        cause: "The length of id is incorrect",
        message: "Send id of 24 characters",
        code: enumErrors.INVALID_REQUEST,
        statusCode: 400,
      });

    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;

    if (
      !title &&
      !description &&
      !code &&
      !price &&
      !status &&
      !category &&
      !thumbnails
    )
      customError.create({
        name: "Error when trying update product",
        message: "Complete minimum one input to update product correctly",
        cause: "None of the expected parameters were received",
        code: enumErrors.MISSING_VALUES,
        statusCode: 400,
      });

    const object = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    const putResponse = await ProductsService.putById(id, object);
    if (putResponse.error) customError.create({...putResponse});

    req.logger.http("statusCode: " + putResponse.status);
    return res.send(putResponse);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.pid;

    if (id.length !== 24)
      customError.create({
        name: "Invalid id",
        cause: "The length of id is incorrect",
        message: "Send id of 24 characters",
        code: enumErrors.INVALID_REQUEST,
        statusCode: 400,
      });

    const deleteResponse = await ProductsService.deleteById(id, user);
    if (deleteResponse.error) customError.create({...deleteResponse});

    req.logger.http("statusCode: " + deleteResponse.status);
    return res.send(deleteResponse);
  } catch (error) {
    next(error);
  }
};
