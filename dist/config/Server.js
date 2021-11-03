"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
class Server {
    // Constructor
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.httpServer = http_1.default.createServer(this.app);
        this.io = new socket_io_1.default.Server(this.httpServer, { serveClient: true });
    }
    // Singleton of server instance
    static get instance() {
        return this._instance || (this._instance = new this(Number(process.env.APP_PORT) || 3000));
    }
    // Server initializer
    start(callback) {
        this.httpServer.listen(this.port, callback());
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map