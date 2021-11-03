import express, { Application } from "express";
import socketIO from "socket.io";
import http from "http";

export default class Server {
  private static _instance: Server;
  public app: Application;
  public port: number;
  public httpServer: http.Server;
  public io: socketIO.Server;

  // Constructor
  private constructor(port: number) {
    this.app = express();
    this.port = port;
    this.httpServer = http.createServer(this.app);
    this.io = new socketIO.Server(this.httpServer, { serveClient: true });
  }

  // Singleton of server instance
  public static get instance() {
    return this._instance || (this._instance = new this(Number(process.env.APP_PORT) || 3000));
  }

  // Server initializer
  public start(callback: Function) {
    this.httpServer.listen(this.port, callback());
  }
}
