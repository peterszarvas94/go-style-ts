import { INPUT_FILE } from "./config";
import { handleError } from "./error";
import { openFile, parseFile } from "./file";
import { LogLevel, log } from "./logger";

function main() {
  log(LogLevel.INFO, "main", "Program started");

  const filename = INPUT_FILE;

  const [fileContent, fileErr] = openFile(filename);
  if (fileErr !== null) {
    return handleError("main", fileErr);
  }

  const [sum, parseErr] = parseFile(fileContent);
  if (parseErr !== null) {
    return handleError("main", parseErr);
  }

  log(LogLevel.INFO, "main", `Sum: ${sum}`);

  log(LogLevel.INFO, "main", "Program ended");
}

main();
