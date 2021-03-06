import { NextFunction, Request, Response } from "express";
import { iResponse } from "../../interfaces/IResponse";
import UserModel from "../../models/UserModel";
import UserRepository from "../../repositories/UserRepository";
import { Logger } from "../../utils/Logger";

class PublicController {

  /**
   * Main public rest route
   * @param req
   * @param res
   * @param next
   */
  public async indexAction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usersRepository: UserRepository = new UserRepository(UserModel);
      await usersRepository.createUserAccount({
                                                username: "admin",
                                                email: "admin@domain.com",
                                                avatar: "",
                                                password: "admin"
                                              });
      const response: iResponse = {
        error: false,
        statusCode: 200,
        statusMessage: "Ok",
        devMessage: "",
        uiMessage: "Server Online",
        data: {},
      };
      res.status(response.statusCode).send(response);
    } catch (e) {
      next(e);
    }
  }

}

export const publicController: PublicController = new PublicController();
