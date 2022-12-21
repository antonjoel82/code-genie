import { ExecutionConfig, FileNameGenerator, Schema } from "../core";
import { writeOrAppendFile } from "../core/files/utils/writeOrAppendFile";
import { FileOutputHandler } from "./TemplateGenerator";

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

    writeOrAppendFile({
      basePath: fileOptions.targetPath,
      fileName,
      content: template,
    });
  }
};
