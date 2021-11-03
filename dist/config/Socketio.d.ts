import { Server } from "socket.io";
export default class Socketio {
    private io;
    /**
     * Constructor
     * @param io
     */
    constructor(io: Server);
    /**
     * Listen all socket connection events
     * @private
     */
    private listenConnection;
}
