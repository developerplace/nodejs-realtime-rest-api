import { NextFunction, Request, Response } from "express";
declare class PublicController {
    /**
     * Main public rest route
     * @param req
     * @param res
     * @param next
     */
    indexAction(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const publicController: PublicController;
export {};
