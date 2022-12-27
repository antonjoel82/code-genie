#!/usr/bin/env ts-node

import { argv, exit } from "process";
import { Schema } from "../../core";
import { ProcessedArgs, processArgs } from "../../scripts/processArgs";
import { BasicJestFileGenerator } from "../generators/BasicJestFileGenerator";

let argLookup: ProcessedArgs;
try {
  argLookup = processArgs(argv);
} catch (err) {
  console.error(err.message);
  exit(1);
}

const model = argLookup.primary;
const testSchema: Schema = {
  model,
  modelPlural: model + "s",
};

const generator = new BasicJestFileGenerator({
  language: argLookup.language ?? "TypeScript",
  testScope: "unit",
});

generator.execute(testSchema, {
  fileOptions: {
    targetPath: argLookup.path,
  },
});
