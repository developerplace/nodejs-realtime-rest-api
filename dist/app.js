"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const Session_1 = __importDefault(require("./config/Session"));
const Logger_1 = require("./utils/Logger");
const Server_1 = __importDefault(require("./config/Server"));
const Database_1 = __importDefault(require("./config/Database"));
const Api_1 = __importDefault(require("./config/Api"));
const Socketio_1 = __importDefault(require("./config/Socketio"));
/**
 * Configure environment vars
 */
(0, dotenv_1.config)();
/**
 * Define server instance
 */
const server = Server_1.default.instance;
Database_1.default.instance;
/**
 * Run application
 */
server.start(async () => {
    new Api_1.default(server.app);
    new Socketio_1.default(server.io);
    new Session_1.default(server);
    Logger_1.Logger.debug(`${process.env.APP_NAME} - ${process.env.APP_DESCRIPTION} running on ${process.env.APP_URL}:${Number(process.env.APP_PORT) || 3000}`);
});
//# sourceMappingURL=app.js.map