import { Schema, ExecutionContext } from "../../core";
import { TemplateGenerator } from "../../template-generator";

export class IndexExportGenerator extends TemplateGenerator {
  constructor() {
    super({
      shouldWriteFile: true,
      fileOptions: { fileName: "index.ts" },
    });
  }

  // protected validateParams: (cfg: ExecutionConfig) => void;

  generate = ({ model }: Schema, _cfg: ExecutionContext) => {
    const template = `export * from "./${model}";\n`;

    return template;
  };
}
