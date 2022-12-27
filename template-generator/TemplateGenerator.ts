import { Schema, ExecutionContext, ExecutionConfig } from "../core/constructs";
import { handleFileOutputDefault } from "./handleFileOutputDefault";

type HydratedTemplate = string;

export type ExecuteFunction = (
  schema: Schema,
  execCtx?: ExecutionContext
) => HydratedTemplate;

export type GenerateFunction = (
  schema: Schema,
  executionConfig?: ExecutionConfig,
  execCtx?: ExecutionContext
) => HydratedTemplate;

export type FileOutputHandler = (
  schema: Schema,
  executionConfig: ExecutionConfig,
  template: HydratedTemplate
) => void;

const mergeExecutionConfigWithContext = (
  executionConfig: ExecutionConfig,
  execCtx: ExecutionContext
): ExecutionConfig => {
  // console.log({ executionConfig, execCtx });
  return {
    ...executionConfig,
    fileOptions: {
      ...executionConfig.fileOptions,
      ...execCtx.fileOptions,
    },
  };
};

export abstract class TemplateGenerator<
  TemplateConfig extends ExecutionConfig = ExecutionConfig
> {
  constructor(private readonly executionConfig: TemplateConfig) {}

  /**
   * @returns a string of the hydrated template.
   */
  abstract generate: GenerateFunction;

  protected validateExecutionArgs(
    schema: Schema,
    execCtx: ExecutionContext
  ): string[] {
    const errMsgs: string[] = [];
    if (!schema.model) {
      // TODO improve
      errMsgs.push("Model required.");
    }
    return errMsgs;
  }

  protected handleFileOutput: FileOutputHandler = handleFileOutputDefault;

  protected handleErrorMessages = (errMsgs: string[]) => {
    errMsgs.forEach((msg) => console.error(msg));

    return errMsgs.length > 0;
  };

  execute: ExecuteFunction = (schema, execCtx) => {
    try {
      if (
        this.handleErrorMessages(this.validateExecutionArgs(schema, execCtx))
      ) {
        return;
      }
    } catch (err) {
      console.error("An unknown validation error occurred!", err);
    }

    const runtimeConfig = mergeExecutionConfigWithContext(
      this.executionConfig,
      execCtx
    );

    console.log({ runtimeConfig });

    const template = this.generate(schema, runtimeConfig, execCtx);
    this.handleFileOutput(schema, runtimeConfig, template);

    return template;
  };
}

export type TemplateGeneratorDictionary<
  TemplateGeneratorType extends string = string
> = Record<TemplateGeneratorType, TemplateGenerator>;
