#!/usr/bin/env ts-node

import { Schema } from "../core";
import { BasicJestFileGenerator } from "../example-generators/BasicJestFileGenerator";
import { IndexFileGenerator } from "../example-generators/IndexFileGenerator";

const testSchema: Schema = {
  model: "validateTimer",
  modelPlural: "validateTimers",
};

// const generator = new IndexFileGenerator();
const generator = new BasicJestFileGenerator({
  testScope: "unit",
  language: "TypeScript",
  fileSpecialization: "JSX",
});

generator.execute(testSchema, {
  fileOptions: {
    targetPath: "./foo/",
  },
});
