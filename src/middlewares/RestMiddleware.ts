import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { iResponse } from "../interfaces/IResponse";

/**
 * Validate required parameters on REST request
 * @param req
 * @param res
 * @param next
 */
export const validateRequestParameters = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response: iResponse = {
      error: true,
      statusCode: 422,
      statusMessage: "Bad request",
      devMessage: "Required parameters not found in request",
      uiMessage: "Required parameters not found in request",
      data: errors,
    };
    return res.status(response.statusCode).send(response);
  }
  next();
};
