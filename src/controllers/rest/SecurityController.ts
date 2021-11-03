import { NextFunction, Request, Response } from "express";
import SecurityFactory from "../../factories/SecurityFactory";
import { iResponse } from "../../interfaces/IResponse";
import { iUser } from "../../interfaces/models/IUserModel";
import { Logger } from "../../utils/Logger";

class SecurityController {

  /**
   * Create new account using REST
   * @param req
   * @param res
   * @param next
   */
  public async signUpAction(req: Request, res: Response, next: NextFunction): Promise<void> {
    const response: iResponse = {
      error: true,
      statusCode: 500,
      statusMessage: "Internal server error",
      devMessage: "",
      uiMessage: "",
      data: {},
    };
    try {
      const { username, email, password } = req.body;
      const userFactory: SecurityFactory = new SecurityFactory();
      const user: iUser = await userFactory.createUserFactory(username.toLowerCase(), email.toLowerCase().trim(), password);
      response.statusCode = 201;
      response.statusMessage = "Created";
      response.uiMessage = "Account created";
      response.data = user;
      res.status(response.statusCode).send(response);
    } catch (e) {
      res.status(response.statusCode).send(response);
    }
  }

  /**
   * Login on account and get JWT token
   * @param req
   * @param res
   * @param next
   */
  public async signInAction(req: Request, res: Response, next: NextFunction): Promise<void> {
    const response: iResponse = {
      error: true,
      statusCode: 500,
      statusMessage: "Internal server error",
      devMessage: "",
      uiMessage: "",
      data: {},
    };
    try {
      const { email, password } = req.body;
      const userFactory: SecurityFactory = new SecurityFactory();
      const token: string = await userFactory.loginUserAndGetJWTFactory(email.toLowerCase().trim(), password);
      response.statusCode = 200;
      response.statusMessage = "Ok";
      response.uiMessage = "Ok";
      response.data = {
        token
      };
      res.status(response.statusCode).send(response);
    } catch (e) {
      res.status(response.statusCode).send(response);
    }
  }

}

export const securityController: SecurityController = new SecurityController();
