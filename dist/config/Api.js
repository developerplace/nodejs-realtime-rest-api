"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Logger_1 = require("../utils/Logger");
const PublicRouter_1 = __importDefault(require("../routes/rest/PublicRouter"));
class Api {
    // Constructor
    constructor(server) {
        this.app = server;
        this.middlewares();
        this.routes();
        this.errorHandler();
    }
    /**
     * Express basic middlewares
     * @private
     */
    middlewares() {
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, cors_1.default)({ origin: true, credentials: true }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use(`/public`, express_1.default.static(path_1.default.join(__dirname, "../../public")));
        Logger_1.Logger.debug("Application middlewares initialized");
    }
    /**
     * Express API Routes
     * @private
     */
    routes() {
        this.app.use("/api", PublicRouter_1.default);
    }
    /**
     * Express error handler
     * @private
     */
    errorHandler() {
        this.app.use((err, req, res, next) => {
            if (err) {
                const response = {
                    error: true,
                    statusCode: 500,
                    statusMessage: "Internal server error",
                    devMessage: err.message,
                    uiMessage: "An unexpected error occurred while processing your request",
                    data: {
                        name: err.name,
                        message: err.message,
                        stack: err.stack,
                    },
                };
                Logger_1.Logger.error("Error cached");
                Logger_1.Logger.error(err.message);
                res.status(response.statusCode).send(response);
            }
            else {
                next();
            }
        });
    }
}
exports.default = Api;
//# sourceMappingURL=Api.js.map