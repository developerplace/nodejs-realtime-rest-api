import { Application } from "express";
export default class Api {
    private app;
    constructor(server: Application);
    /**
     * Express basic middlewares
     * @private
     */
    private middlewares;
    /**
     * Express API Routes
     * @private
     */
    private routes;
    /**
     * Express error handler
     * @private
     */
    private errorHandler;
}
