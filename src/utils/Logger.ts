import { FolderLogger } from "folder-logger";
import chalk from "chalk";
import moment from "moment";

/**
 * Define folder for logs
 */
const path = `${process.cwd()}/logs/`;

const customLoggerFormat = (log: any, level: any, logger: any) => {
  let defaultFormat ='🕘 %time% - %level% %emoji%: \t\b\b\b\b' + '%log%';
  let emoji: string;
  let time = moment(logger.momentOption).format('YYYY-MM-DD HH:mm:ss');
  let levelName = String(logger.levelNames[level]).toUpperCase();
  switch(levelName){
    case 'CRITICAL':
      time = chalk.bgRedBright(chalk.black(time));
      levelName = chalk.bgRedBright(chalk.black(levelName));
      emoji = "⛔️";
      log = chalk.bgRedBright(chalk.black(log));
      break;
    case 'WARN':
      time = chalk.bgYellowBright(chalk.black(time));
      levelName = chalk.bgYellowBright(chalk.black(levelName));
      emoji = "⚠️";
      log = chalk.bgYellowBright(chalk.black(log));
      break;
    case 'ERROR':
      time = chalk.bgRedBright(chalk.white(time));
      levelName = chalk.bgRedBright(chalk.white(levelName));
      emoji = "💥";
      log = chalk.bgRedBright(chalk.white(log));
      break;
    case 'DEBUG':
      time = chalk.greenBright(time);
      levelName = chalk.greenBright(levelName);
      emoji = "🚧";
      log = chalk.greenBright(log);
      break;
    case 'SYSTEM':
      time = chalk.yellowBright(time);
      levelName = chalk.yellowBright(levelName);
      emoji = "⚙️";
      log = chalk.yellowBright(log);
      break;
    default:
      time = chalk.white(time);
      levelName = chalk.white(levelName);
      emoji = "🤖";
      log = chalk.white(log);
      break;
  }
  return defaultFormat
    .replace('%time%', time)
    .replace('%level%', levelName)
    .replace('%emoji%', emoji)
    .replace('%log%', log);
}

export const Logger: FolderLogger = new FolderLogger(path, {
  logFormat: customLoggerFormat
});
