import {UsersService} from "../dao/repositories/index.js";
import customError from "../errors/customError.js";
import {enumErrors} from "../errors/enumErrors.js";
import {createHash} from "../utils.js";

import ClientUser from "../dao/DTOs/ClientUser.js";



export const getAll = async (req, res, next) => {
  try {
    const getResponse = await UsersService.getAll();
    if (getResponse.error) customError.create({...getResponse});
  
    const getResponseDTO = getResponse.payload.map( productDTO => new ClientUser( productDTO ))
    return res.send( getResponseDTO );

  } catch (error) {
    next(error);
  }
};




export const getBy = async (req, res, next) => {
  try {
    const {email, id} = req.query;

    if (!email && !id)
      customError.create({
        name: "Error when trying to get a filtered user",
        message:
          "It is necessary to define the value of Email or Id to be able to filter a user correctly",
        cause: "Email or id undefined",
        code: enumErrors.INVALID_FILTER,
        statusCode: 400,
      });

    if (id && id.lenth !== 24)
      customError.create({
        name: "Invalid id",
        cause: "The length of id is incorrect",
        message: "Send id of 24 characters",
        code: enumErrors.INVALID_REQUEST,
        statusCode: 400,
      });

    const param = email ? {email: email} : {id: id};

    const getResponse = await UsersService.getBy(param);
    if (getResponse.error) customError.create({...getResponse});

    req.logger.http("statusCode: " + getResponse.status);
    return res.send(getResponse);
  } catch (error) {
    next(error);
  }
};




export const post = async (req, res, next) => {
  try {
    const {firstName, lastName, email, password} = req.body;

    if (!email || !password || !firstName || !lastName)
      customError.create({
        name: "Error when trying post a user",
        message: "complete the inputs to register the user correctly",
        cause: "Incomplete required inputs",
        code: enumErrors.MISSING_VALUES,
        statusCode: 400,
      });

    const user = {
      firstName,
      lastName,
      email,
      password: createHash(password),
      cartId: [],
      role: "user",
      documents: [],
      lastConnection: "",
    };

    const postResponse = await UsersService.post(user);
    if (postResponse.error) customError.create({...postResponse});

    req.logger.http("statusCode: " + postResponse.status);
    return res.send(postResponse);
  } catch (error) {
    next(error);
  }
};




export const postDocuments = async (req, res, next) => {
  try {
    const user = req.user;
    const files = req.files;
    console.log(user);
    if (!files)
      customError.create({
        name: "Error when trying post documents",
        message: "Send files",
        cause: "Files not send",
        code: enumErrors.MISSING_VALUES,
        statusCode: 400,
      });

    if (!Object.keys(files).length)
      customError.create({
        name: "Error when trying post documents",
        message: "Send at least one document",
        cause: "The expected document was not received",
        code: enumErrors.MISSING_VALUES,
        statusCode: 400,
      });

    let documents = {};

    for (const file in files) {
      documents[file] = files[file][0];
    }

    const postResponse = await UsersService.postDocuments(
      {email: user.email},
      documents
    );
    if (postResponse.error) customError.create({...postResponse});

    req.logger.http("statusCode: " + postResponse.status);
    return res.send(postResponse);
  } catch (error) {
    next(error);
  }
};




export const putBy = async (req, res, next) => {
  try {
    if (!req.query.email && !req.query.id)
      customError.create({
        name: "Error when trying to get a filtered user",
        message:
          "It is necessary to define the value of Email or Id to be able to filter a user correctly",
        cause: "Email or id undefined",
        code: enumErrors.INVALID_FILTER,
        statusCode: 400,
      });

    if (req.query.id && req.query.id.lenth !== 24)
      customError.create({
        name: "Invalid id",
        cause: "The length of id is incorrect",
        message: "Send id of 24 characters",
        code: enumErrors.INVALID_REQUEST,
        statusCode: 400,
      });

    const param = req.query.email
      ? {email: req.query.email}
      : {id: req.query.id};

    const {
      firstName,
      lastName,
      email,
      password,
      cartId,
      role,
      documents,
      lastConnection,
    } = req.body;

    if (
      !firstName &&
      !lastName &&
      !email &&
      !password &&
      !cartId &&
      !role &&
      !documents &&
      !lastConnection
    )
      customError.create({
        name: "Missing values",
        message: "None of the expected fields were entered",
        cause: "Wrong user field",
        code: enumErrors.MISSING_VALUES,
        statusCode: 400,
      });

    const object = {
      firstName,
      lastName,
      email,
      password,
      cartId,
      role,
      documents,
      lastConnection,
    };

    const putResponse = await UsersService.putBy(param, object);
    if (putResponse.error) customError.create({...putResponse});

    req.logger.http("statusCode: " + putResponse.status);
    return res.send(putResponse);
  } catch (error) {
    next(error);
  }
};




export const putPremiumRole = async (req, res, next) => {
  try {
    if (!req.query.email && !req.query.id)
      customError.create({
        name: "Error when trying to get a filtered user",
        message:
          "It is necessary to define the value of Email or Id to be able to filter a user correctly",
        cause: "Email or id undefined",
        code: enumErrors.INVALID_FILTER,
        statusCode: 400,
      });

    if (req.query.id && req.query.id.lenth !== 24)
      customError.create({
        name: "Invalid id",
        cause: "The length of id is incorrect",
        message: "Send id of 24 characters",
        code: enumErrors.INVALID_REQUEST,
        statusCode: 400,
      });

    const param = req.query.email
      ? {email: req.query.email}
      : {_id: req.query.id};

    const putResponse = await UsersService.putPremiumRole(param);
    if (putResponse.error) customError.create({...putResponse});

    req.logger.http("statusCode: " + putResponse.status);
    return res.send(putResponse);
  } catch (error) {
    next(error);
  }
};




export const deleteBy = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id)
      customError.create({
        name: "Error when trying to get a filtered user",
        message:
          "It is necessary to define the value of Id to be able to filter a user correctly",
        cause: "Id undefined",
        code: enumErrors.INVALID_FILTER,
        statusCode: 400,
      });

    const deleteResponse = await UsersService.deleteBy(id);
    if (deleteResponse.error) customError.create({...deleteResponse});

    req.logger.http("statusCode: " + deleteResponse.status);
    return res.send(deleteResponse);
  } catch (error) {
    next(error);
  }
};



export const deleteAllOffTime = async (req, res, next) => {
  try{

    const deleteAllResponse = await UsersService.deleteAllOffTime();

    if( deleteAllResponse.error ) customError.create({...deleteAllResponse})

    return res.send( deleteAllResponse ) 

  } catch ( error ){
    next ( error );
  }
}
