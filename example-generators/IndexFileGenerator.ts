import { Schema, ExecutionContext } from "../core";
import { TemplateGenerator } from "../template-generator/TemplateGenerator";

export class IndexFileGenerator extends TemplateGenerator {
  constructor() {
    super({
      shouldWriteFile: true,
      fileOptions: { fileName: "index.ts" },
    });
  }

  generate = ({ model }: Schema, _cfg: ExecutionContext) => {
    const template = `export * from "./${model}";\n`;

    return template;
  };
}
