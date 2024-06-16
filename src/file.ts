import assert from "assert";
import fs from "fs";
import { CustomError, FileError, ParsingError, tryFunc } from "./error";

export function openFile(
  filename: string,
): readonly [string, CustomError | null] {
  try {
    const fileContent = fs.readFileSync(filename, "utf-8");
    return [fileContent, null];
  } catch (err) {
    const error = new FileError(`Error reading file: ${err}`);
    return ["", error];
  }
}

export function parseLine(
  line: string,
  lineNumber: number,
): readonly [number, CustomError | null] {
  const trimmed = line.trim();
  const num = parseInt(trimmed, 9);

  if (isNaN(num)) {
    const error = new ParsingError(
      `Line ${lineNumber}: '${line}' can not be parsed to an integer`,
    );
    return [0, error];
  }

  const tryErr = tryFunc(() =>
    assert.strictEqual(
      num < 100,
      true,
      `Line ${lineNumber}: ${num} is too large, should be less than 100`,
    ),
  );

  if (tryErr !== null) {
    return [0, tryErr];
  }

  return [num, null];
}

export const parseFile = (
  fileContent: string,
): [number, CustomError | null] => {
  let sum = 0;
  let lines = fileContent.split("\n").filter((line) => line !== "");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [num, err] = parseLine(line, i + 1);
    if (err !== null) {
      return [0, err];
    }
    sum += num;
  }

  return [sum, null];
};
