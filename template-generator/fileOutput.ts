import { ExecutionConfig, FileNameGenerator, Schema } from "../core";
import { FileOutputHandler } from "./TemplateGenerator";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const DEFAULT_FILE_NAME_GENERATOR: FileNameGenerator = ({ model }) =>
  `${model}.ts`;

export const handleFileOutputDefault: FileOutputHandler = (
  schema: Schema,
  { shouldWriteFile, fileOptions }: ExecutionConfig,
  template: string
) => {
  if (shouldWriteFile) {
    const maybeGenerateFileName =
      fileOptions?.fileName ?? DEFAULT_FILE_NAME_GENERATOR;
    const fileName =
      typeof maybeGenerateFileName === "function"
        ? maybeGenerateFileName(schema)
        : maybeGenerateFileName;

    const filePath = join(fileOptions.targetPath ?? "", fileName);

    console.log({ fileName, filePath, fileOptions });

    // ensure the path exists; if not, create the necessary directories
    if (fileOptions.targetPath && !existsSync(fileOptions.targetPath)) {
      mkdirSync(fileOptions.targetPath, { recursive: true });
    }

    writeFileSync(filePath, template);
  }
};
