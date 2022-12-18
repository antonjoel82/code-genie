import { Schema, ExecutionContext, ExecutionConfig } from "../core/constructs";
import { handleFileOutputDefault } from "./fileOutput";

export type ExecuteFunction = (
  schema: Schema,
  context?: ExecutionContext
) => void;

export type GenerateFunction = (
  schema: Schema,
  executionConfig?: ExecutionConfig,
  context?: ExecutionContext
) => string;

export type FileOutputHandler = (
  schema: Schema,
  executionConfig: ExecutionConfig,
  template: string
) => void;

const mergeExecutionConfigWithContext = (
  executionConfig: ExecutionConfig,
  context: ExecutionContext
): ExecutionConfig => {
  return {
    ...executionConfig,
    fileOptions: context.fileOptions,
  };
};

export abstract class TemplateGenerator {
  constructor(private readonly executionConfig: ExecutionConfig = {}) {}

  abstract generate: GenerateFunction;

  protected handleFileOutput: FileOutputHandler = handleFileOutputDefault;
  execute: ExecuteFunction = (schema, context) => {
    const runtimeConfig = mergeExecutionConfigWithContext(
      this.executionConfig,
      context
    );

    console.log({ runtimeConfig });

    const template = this.generate(schema, runtimeConfig, context);
    this.handleFileOutput(schema, runtimeConfig, template);
  };
}

export type TemplateGeneratorDictionary<
  TemplateGeneratorType extends string = string
> = Record<TemplateGeneratorType, TemplateGenerator>;
