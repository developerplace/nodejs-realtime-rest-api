"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const folder_logger_1 = require("folder-logger");
const chalk_1 = __importDefault(require("chalk"));
const moment_1 = __importDefault(require("moment"));
/**
 * Define folder for logs
 */
const path = `${process.cwd()}/logs/`;
const customLoggerFormat = (log, level, logger) => {
    let defaultFormat = "🕘 %time% - %level% %emoji%: \t\b\b\b\b" + "%log%";
    let emoji;
    let time = (0, moment_1.default)(logger.momentOption).format("YYYY-MM-DD HH:mm:ss");
    let levelName = String(logger.levelNames[level]).toUpperCase();
    switch (levelName) {
        case "CRITICAL":
            time = chalk_1.default.bgRedBright(chalk_1.default.black(time));
            levelName = chalk_1.default.bgRedBright(chalk_1.default.black(levelName));
            emoji = "⛔️";
            log = chalk_1.default.bgRedBright(chalk_1.default.black(log));
            break;
        case "WARN":
            time = chalk_1.default.bgYellowBright(chalk_1.default.black(time));
            levelName = chalk_1.default.bgYellowBright(chalk_1.default.black(levelName));
            emoji = "⚠️";
            log = chalk_1.default.bgYellowBright(chalk_1.default.black(log));
            break;
        case "ERROR":
            time = chalk_1.default.bgRedBright(chalk_1.default.white(time));
            levelName = chalk_1.default.bgRedBright(chalk_1.default.white(levelName));
            emoji = "💥";
            log = chalk_1.default.bgRedBright(chalk_1.default.white(log));
            break;
        case "DEBUG":
            time = chalk_1.default.greenBright(time);
            levelName = chalk_1.default.greenBright(levelName);
            emoji = "🚧";
            log = chalk_1.default.greenBright(log);
            break;
        case "SYSTEM":
            time = chalk_1.default.yellowBright(time);
            levelName = chalk_1.default.yellowBright(levelName);
            emoji = "⚙️";
            log = chalk_1.default.yellowBright(log);
            break;
        default:
            time = chalk_1.default.white(time);
            levelName = chalk_1.default.white(levelName);
            emoji = "🤖";
            log = chalk_1.default.white(log);
            break;
    }
    return defaultFormat.replace("%time%", time).replace("%level%", levelName).replace("%emoji%", emoji).replace("%log%", log);
};
exports.Logger = new folder_logger_1.FolderLogger(path, {
    logFormat: customLoggerFormat,
});
//# sourceMappingURL=Logger.js.map