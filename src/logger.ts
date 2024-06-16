import fs from "fs";
import { LOG_FILE, WRITE_TO_CONSOLE } from "./config";

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

export function log(
  severity: LogLevel,
  origin: string,
  message: string,
  stack?: string,
) {
  const date = new Date().toISOString();
  const jsonLog = JSON.stringify({ date, severity, origin, message, stack });

  writeToFile(LOG_FILE, jsonLog);
}

function writeToFile(logFileName: string, text: string) {
  fs.appendFileSync(logFileName, `${text}\n`);

  if (WRITE_TO_CONSOLE) {
    console.log(text);
  }
}
