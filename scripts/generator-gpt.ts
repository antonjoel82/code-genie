#!/usr/bin/env ts-node
const fs = require("fs");
const path = require("path");
const process = require("process");

type TemplateGeneratorType = "ACTION_CREATOR" | "SELECTOR" | "THUNK";

// Accepts the name of a function and the type of function
// (one of ACTION_CREATOR, SELECTOR, or THUNK)
function generateFunction(name: string, type: TemplateGeneratorType) {
  // Create the directory with the name of the function
  fs.mkdirSync(name);

  // Create the TypeScript file with the function
  const functionFilePath = path.join(name, `${name}.ts`);
  const functionFileContent = `export const ${name}-${type} = (): void => {
  // your code here
};`;
  fs.writeFileSync(functionFilePath, functionFileContent);

  // Create the jest test file that test that function
  const testFilePath = path.join(name, `${name}.test.ts`);
  const testFileContent = `import { ${name} } from './${name}';

test('${name} should do something', () => {
  // your test code here
});`;
  fs.writeFileSync(testFilePath, testFileContent);

  // Create the index.ts file that exports the function
  const indexFilePath = path.join(name, "index.ts");
  const indexFileContent = `export * from './${name}';`;
  fs.writeFileSync(indexFilePath, indexFileContent);
}

// Parse the command line arguments to get the name and type of the function
const name = process.argv[2];
const type = process.argv[3] as TemplateGeneratorType;

// Call the generateFunction function with the parsed arguments
generateFunction(name, type);

export {};
