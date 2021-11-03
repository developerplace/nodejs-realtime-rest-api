"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../utils/Logger");
class Socketio {
    /**
     * Constructor
     * @param io
     */
    constructor(io) {
        this.io = io;
        this.listenConnection();
    }
    /**
     * Listen all socket connection events
     * @private
     */
    listenConnection() {
        Logger_1.Logger.debug("SocketIo connected successfully");
        const response = {
            error: false,
            statusCode: 200,
            statusMessage: "Ok",
            devMessage: "",
            uiMessage: "",
            data: {},
        };
        this.io.on("connection", (socket) => {
            response.uiMessage = "Socket connected";
            response.data = { socketId: socket.id };
            socket.emit("connected", response);
            Logger_1.Logger.debug(`Socket connected: ${socket.id}`);
        });
        this.io.on("disconnect", (socket) => {
            Logger_1.Logger.debug(`Socket disconnected: ${socket.id}`);
        });
    }
}
exports.default = Socketio;
//# sourceMappingURL=Socketio.js.map