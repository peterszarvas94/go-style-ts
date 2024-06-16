import { LogLevel, log } from "./logger";

enum ErrorType {
  FILE = "FileError",
  PARSING = "ParsingError",
  UNKNOWN = "UnknownError",
}

export interface CustomError extends Error {
  message: string;
}

export class FileError extends Error {
  constructor(message: string) {
    super(message); // Call super constructor with error message
    this.name = ErrorType.FILE; // Set name property explicitly
    Object.setPrototypeOf(this, FileError.prototype); // Set prototype explicitly
  }
}

export class ParsingError extends Error {
  constructor(message: string) {
    super(message); // Call super constructor with error message
    this.name = ErrorType.PARSING; // Set name property explicitly
    Object.setPrototypeOf(this, ParsingError.prototype); // Set prototype explicitly
  }
}

export function handleError(origin: string, error: Error) {
  log(LogLevel.ERROR, origin, error.message, error.stack);

  // ... wow such error handling
  switch (error.name) {
    case ErrorType.FILE:
      throw new FileError(error.message);
    case ErrorType.PARSING:
      throw new ParsingError(error.message);
    default:
      throw error;
  }
}

export function tryFunc(func: Function): Error | null {
  try {
    func();
    return null;
  } catch (err) {
    return err as Error;
  }
}
