"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicController = void 0;
class PublicController {
    /**
     * Main public rest route
     * @param req
     * @param res
     * @param next
     */
    async indexAction(req, res, next) {
        try {
            const response = {
                error: false,
                statusCode: 200,
                statusMessage: "Ok",
                devMessage: "",
                uiMessage: "Server Online",
                data: {},
            };
            res.status(response.statusCode).send(response);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.publicController = new PublicController();
//# sourceMappingURL=PublicController.js.map