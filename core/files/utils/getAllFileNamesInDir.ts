import { readdirSync } from "fs";
import { stripExtensions } from "./stripExtensions";

export const getAllFileNamesInDir = (
  dirPath: string,
  shouldStripExtensions: boolean = true
) => {
  if (!dirPath) {
    return [];
  }

  const fileNames = readdirSync(dirPath);
  return shouldStripExtensions ? stripExtensions(...fileNames) : fileNames;
};
