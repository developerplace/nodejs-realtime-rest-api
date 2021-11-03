"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const Logger_1 = require("../utils/Logger");
const sharedSession = require("express-socket.io-session");
class Session {
    /**
     * Constructor
     * @param server
     */
    constructor(server) {
        /**
         * Session configuration
         * @private
         */
        this.sessionConfig = (0, express_session_1.default)({
            secret: process.env.APP_SESSION_SECRET || "MyStupidSecret",
            resave: true,
            saveUninitialized: true,
        });
        server.app.use(this.sessionConfig);
        server.io.use(sharedSession(this.sessionConfig, {
            autoSave: true,
        }));
        Logger_1.Logger.debug("Application session configured");
    }
}
exports.default = Session;
//# sourceMappingURL=Session.js.map