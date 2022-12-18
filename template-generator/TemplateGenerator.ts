import { Schema, GenerationContext, ExecutionConfig } from "../core/constructs";
import { handleFileOutputDefault } from "./fileOutput";

export type ExecuteFunction = (
  schema: Schema,
  context?: GenerationContext
) => void;

export type GenerateFunction = (
  schema: Schema,
  executionConfig?: ExecutionConfig,
  context?: GenerationContext
) => string;

export type FileOutputHandler = (
  schema: Schema,
  executionConfig: ExecutionConfig,
  template: string
) => void;

// export interface TemplateGenerator {
//   generate(schema: Schema, config: Config): string;
//   // abstract handleFileOutput: FileOutputHandler = handleFileOutputDefault;
// }

export abstract class TemplateGenerator {
  constructor(private readonly executionConfig: ExecutionConfig = {}) {}

  abstract generate: GenerateFunction;

  protected handleFileOutput: FileOutputHandler = handleFileOutputDefault;
  execute: ExecuteFunction = (schema, context) => {
    const template = this.generate(schema, this.executionConfig, context);
    this.handleFileOutput(schema, this.executionConfig, template);
  };
}

export type TemplateGeneratorDictionary<
  TemplateGeneratorType extends string = string
> = Record<TemplateGeneratorType, TemplateGenerator>;
