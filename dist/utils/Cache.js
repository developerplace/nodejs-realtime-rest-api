"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("./Logger");
/**
 * Cache configuration
 */
const cache = require("express-redis-cache")({
    host: process.env.APP_REDIS_HOST || "localhost",
    port: parseInt(process.env.APP_REDIS_PORT) || 6379,
    auth_pass: process.env.APP_REDIS_PASSWORD || "",
    expire: parseInt(process.env.APP_REDIS_CACHE_EXPIRE) || 5,
});
/**
 * Cache message handler
 */
cache.on("message", function (message) {
    Logger_1.Logger.debug(message);
});
/**
 * Cache error handler
 */
cache.on("error", function (error) {
    Logger_1.Logger.error(error);
});
exports.default = cache;
//# sourceMappingURL=Cache.js.map