import { config } from "dotenv";
import Server from "./config/Server";

// Configure environment vars
config();

// Define server instance
const server: Server = Server.instance;

// Run application
server.start(async (): Promise<void> => {
  console.log(`${process.env.APP_NAME} - ${process.env.APP_DESCRIPTION} running on ${process.env.APP_URL}:${Number(process.env.APP_PORT) || 3000}`);
});
