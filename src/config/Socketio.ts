import { Server, Socket } from "socket.io";
import { iResponse } from "../interfaces/IResponse";
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
    const response: iResponse = {
      error: false,
      statusCode: 200,
      statusMessage: "Ok",
      devMessage: "",
      uiMessage: "",
      data: {}
    }
    this.io.on("connection", (socket: Socket) => {
      response.uiMessage = "Socket connected";
      response.data = { socketId: socket.id };
      socket.emit("connected", response);
      Logger.debug(`Socket connected: ${socket.id}`);
    });
    this.io.on('disconnect', (socket: Socket) => {
      Logger.debug(`Socket disconnected: ${socket.id}`);
    });
  }

}
