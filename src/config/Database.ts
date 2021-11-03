import mongoose from "mongoose";
import { Logger } from "../utils/Logger";

export default class Database {

  private static _instance: Database;

  // Constructor
  private constructor() {
    mongoose.Promise = global.Promise;
    const cluster = (process.env.APP_USE_MONGO_CLUSTER && process.env.APP_USE_MONGO_CLUSTER === "true") ? "mongodb+srv" : "mongodb+srv";
    let mongoUri = `${cluster}://${process.env.APP_MONGO_USERNAME}:${process.env.APP_MONGO_PASSWORD}@${process.env.APP_MONGO_URL}/${process.env.APP_MONGO_DATABASE}?retryWrites=true&w=majority`;
    mongoose.connect(mongoUri, {}, (err) => {
      if (err) {
        Logger.error(err.message);
        process.exit();
      } else {
        Logger.debug(`MongoDB connected successfully`);
      }
    });
  }

  // Singleton of mongo instance
  public static get instance() {
    if (process.env.APP_USE_MONGO && process.env.APP_USE_MONGO === "true") {
      return this._instance || (this._instance = new this());
    }
  }

}
