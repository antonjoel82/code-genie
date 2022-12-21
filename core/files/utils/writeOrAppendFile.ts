import * as fs from "fs";
import { join } from "path";

interface FileWritingProps {
  basePath?: string;
  fileName: string;
  content: string;
}

export const writeOrAppendFile = ({
  basePath,
  fileName,
  content,
}: FileWritingProps) => {
  const filePath = join(basePath ?? "", fileName);

  // ensure the path exists; if not, create the necessary directories
  if (basePath && !fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }

  if (fs.existsSync(filePath)) {
    console.log(`Appending to existing file at ${filePath}`);
    fs.appendFileSync(filePath, content);
  } else {
    console.log(`Writing new file at ${filePath}`);
    fs.writeFileSync(filePath, content);
  }
};
