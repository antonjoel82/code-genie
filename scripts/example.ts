#!/usr/bin/env ts-node

import { Schema } from "../core";
import { IndexFileGenerator } from "../example-generators/IndexFileGenerator";

const testSchema: Schema = {
  model: "selectCowboy",
  modelPlural: "selectCowboys",
};

const generator = new IndexFileGenerator();

generator.execute(testSchema, {
  fileOptions: {
    targetPath: "./foo/bar/wheres-my/car",
  },
});
