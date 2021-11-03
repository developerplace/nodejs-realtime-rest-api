import { config } from "dotenv";
import { Logger } from "./utils/Logger";
import Server from "./config/Server";
import Database from "./config/Database";

/**
 * Configure environment vars
 */
config();

/**
 * Define server instance
 */
const server: Server = Server.instance;
Database.instance;

/**
 * Run application
 */
server.start(async (): Promise<void> => {
  Logger.debug(`${process.env.APP_NAME} - ${process.env.APP_DESCRIPTION} running on ${process.env.APP_URL}:${Number(process.env.APP_PORT) || 3000}`);
});
