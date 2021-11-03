"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Logger_1 = require("../utils/Logger");
class Database {
    // Constructor
    constructor() {
        mongoose_1.default.Promise = global.Promise;
        const cluster = process.env.APP_USE_MONGO_CLUSTER && process.env.APP_USE_MONGO_CLUSTER === "true" ? "mongodb+srv" : "mongodb+srv";
        let mongoUri = `${cluster}://${process.env.APP_MONGO_USERNAME}:${process.env.APP_MONGO_PASSWORD}@${process.env.APP_MONGO_URL}/${process.env.APP_MONGO_DATABASE}?retryWrites=true&w=majority`;
        mongoose_1.default.connect(mongoUri, {}, (err) => {
            if (err) {
                Logger_1.Logger.error(err.message);
                process.exit();
            }
            else {
                Logger_1.Logger.debug(`MongoDB connected successfully`);
            }
        });
    }
    // Singleton of mongo instance
    static get instance() {
        if (process.env.APP_USE_MONGO && process.env.APP_USE_MONGO === "true") {
            return this._instance || (this._instance = new this());
        }
    }
}
exports.default = Database;
//# sourceMappingURL=Database.js.map