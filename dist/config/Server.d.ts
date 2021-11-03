/// <reference types="node" />
import { Application } from "express";
import socketIO from "socket.io";
import http from "http";
export default class Server {
    private static _instance;
    app: Application;
    port: number;
    httpServer: http.Server;
    io: socketIO.Server;
    private constructor();
    static get instance(): Server;
    start(callback: Function): void;
}
