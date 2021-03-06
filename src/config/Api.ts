import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { iResponse } from "../interfaces/IResponse";
import { Logger } from "../utils/Logger";

import PublicRouter from "../routes/rest/PublicRouter";
import SecurityRouter from "../routes/rest/SecurityRouter";

export default class Api {

  private app: Application;

  // Constructor
  constructor(server: Application) {
    this.app = server;
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  /**
   * Express basic middlewares
   * @private
   */
  private middlewares() {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(`/public`, express.static(path.join(__dirname, "../../public")));
    Logger.debug("Application middlewares initialized");
  }

  /**
   * Express API Routes
   * @private
   */
  private routes() {
    this.app.use('/api', PublicRouter);
    this.app.use('/api/security', SecurityRouter);
  }

  /**
   * Express error handler
   * @private
   */
  private errorHandler() {
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err) {
        const response: iResponse = {
          error: true,
          statusCode: 500,
          statusMessage: "Internal server error",
          devMessage: err.message,
          uiMessage: "An unexpected error occurred while processing your request",
          data: err,
        };
        Logger.error("Error cached");
        res.status(response.statusCode).send(response);
      } else {
        next();
      }
    });
  }

}
