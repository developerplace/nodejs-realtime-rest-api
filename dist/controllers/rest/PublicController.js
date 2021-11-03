"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicController = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const UserRepository_1 = __importDefault(require("../../repositories/UserRepository"));
class PublicController {
    /**
     * Main public rest route
     * @param req
     * @param res
     * @param next
     */
    async indexAction(req, res, next) {
        try {
            const usersRepository = new UserRepository_1.default(UserModel_1.default);
            await usersRepository.createUserAccount({
                username: "admin",
                email: "admin@domain.com",
                avatar: "",
                password: "admin",
            });
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