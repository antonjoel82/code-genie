#!/usr/bin/env ts-node

import { argv, exit } from "process";
import { Schema } from "../../core";
import {
  ProcessArgsOptions,
  DEFAULT_ALIASES,
  ProcessedArgs,
  processArgs,
} from "../../scripts/processArgs";
import { TemplateGenerator } from "../../template-generator";
import {
  BasicJestFileGenerator,
  TestFileExtensionConfig,
} from "../generators/BasicJestFileGenerator";
import { IndexExportGenerator } from "../generators/IndexExportGenerator";

// const GENERATOR_DICTIONARY: TemplateGeneratorDictionary<MyTemplateGeneratorType> = {
//   jest: BasicJestFileGenerator,

// };

// type ClassType<T extends abstract new (...args: any) => any> = abstract new (
//   params: ConstructorParameters<T>
// ) => InstanceType<T>;
// type GenDict<T extends string> = Record<T, ClassType<typeof TemplateGenerator>>;

// const gens: GenDict<MyTemplateGeneratorType> = {
//   index: IndexExportGenerator,
//   // "jest": BasicJestFileGenerator
// };

// const ind = new gens["index"]();

// const createGenerator = (
//   type: MyTemplateGeneratorType,
//   context: Record<string, unknown>
// ) => {
//   const gen = gens[type];
//   type SF = FirstParamType<typeof gen>;

//   const instance = new gen()
// }

type MyTemplateGeneratorType = "index" | "jest";

class GeneratorFactory {
  static createGenerator(
    type: MyTemplateGeneratorType,
    context: Record<string, unknown>
  ): TemplateGenerator {
    switch (type) {
      case "index":
        return new IndexExportGenerator();
      case "jest":
        return new BasicJestFileGenerator(
          context as unknown as TestFileExtensionConfig
        );
      default:
        throw new Error("Invalid product type");
    }
  }
}

const ALLOWED_UNLABELED_ARG: string = "type";
const processArgOpts: ProcessArgsOptions = {
  aliases: {
    ...DEFAULT_ALIASES,
    [ALLOWED_UNLABELED_ARG]: ["t"],
    testScope: ["scope", "s"],
  },
  allowedUnlabeledArg: ALLOWED_UNLABELED_ARG,
};

let processedArgs: ProcessedArgs;
try {
  processedArgs = processArgs(argv, processArgOpts);
} catch (err) {
  console.error(err.message);
  exit(1);
}

const model = processedArgs["name"];
const testSchema: Schema = {
  model,
  modelPlural: model + "s",
};

const prepareContext = (args: ProcessedArgs) => {
  return args;
};

try {
  const generator = GeneratorFactory.createGenerator(
    processedArgs.primary as MyTemplateGeneratorType,
    prepareContext(processedArgs)
  );
  generator.execute(testSchema, {
    fileOptions: {
      targetPath: processedArgs.path,
    },
  });
} catch (err) {
  console.error(err.message);
  exit(1);
}
