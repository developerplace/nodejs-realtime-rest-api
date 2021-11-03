import { Server, Socket } from "socket.io";
import { Logger } from "../utils/Logger";

export default class Socketio {

  private io: Server;

  /**
   * Constructor
   * @param io
   */
  constructor(io: Server) {
    this.io = io;
    this.listenConnection();
  }

  /**
   * Listen all socket connection events
   * @private
   */
  private listenConnection(): void {
    Logger.debug("SocketIo connected successfully");
    this.io.on("connection", (socket: Socket) => {
      Logger.debug(`Socket connected: ${socket}`);
    });
    this.io.on('disconnect', (socket: Socket) => {
      Logger.debug(`Socket disconnected: ${socket}`);
    });
  }

}
