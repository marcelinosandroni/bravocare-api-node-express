import winston from "winston";
import path from "path";

const logPaths = {
  error: path.join(__dirname, "../../logs/error.log"),
  warn: path.join(__dirname, "../../logs/warn.log"),
  info: path.join(__dirname, "../../logs/info.log"),
};

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "any-name" },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

logger.info("Default logger initialized", { logPaths });
