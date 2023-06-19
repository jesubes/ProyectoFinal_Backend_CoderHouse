import {TicketsService} from "../dao/repositories/index.js";
import customError from "../errors/customError.js";

export const getAll = async (req, res, next) => {
  try {
    const getResponse = await TicketsService.getAll();
    if (getResponse.error) customError.create({...getResponse});

    req.logger.http("statusCode: " + getResponse.status);
    return res.send(getResponse);
  } catch (error) {
    next(error);
  }
};


export const getById = async (req, res, next) => {
  try {
    const {tid} = req.params

    const getResponse = await TicketsService.getById(tid);
    if (getResponse.error) customError.create({...getResponse});

    req.logger.http("statusCode: " + getResponse.status);
    return res.send(getResponse);
  } catch (error) {
    next(error);
  }
};


export const post = async (req, res, next) => {
  try {
    const {cartId, uid} = req.body;
    const ticket = [cartId,uid]
    if (!cartId && !uid) {
      const postResponse = await TicketsService.post(ticket);
      if (postResponse.error) customError.create({...postResponse});

      req.logger.http("statusCode: " + postResponse.status);
      return res.send(postResponse);
    }

  } catch (error) {
    next(error);
  }
};
