import Server from "./Server";
import session from "express-session";
import { Logger } from "../utils/Logger";
const sharedSession = require("express-socket.io-session");

export default class Session {

  /**
   * Session configuration
   * @private
   */
  private sessionConfig = session({
                                    secret: process.env.APP_SESSION_SECRET || "MyStupidSecret",
                                    resave: true,
                                    saveUninitialized: true,
                                  });

  /**
   * Constructor
   * @param server
   */
  constructor(server: Server) {
    server.app.use(this.sessionConfig);
    server.io.use(sharedSession(this.sessionConfig, {
      autoSave:true
    }));
    Logger.debug("Application session configured");
  }

}
