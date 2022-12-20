import { Schema, ExecutionContext, FileNameGenerator } from "../core";
import { TemplateGenerator } from "../template-generator/TemplateGenerator";

export type TestScope = "integration" | "unit";
const TestScopeToFileEnding: Record<TestScope, string> = {
  integration: "ispec",
  unit: "uspec",
};

export type ProgrammingLanguage = "TypeScript" | "JavaScript";
const ProgrammingLanguageToFileExtension: Record<ProgrammingLanguage, string> =
  {
    JavaScript: "js",
    TypeScript: "ts",
  };

export type FileSpecialization = "JSX";
const FileSpecializationToFileExtension: Record<FileSpecialization, string> = {
  JSX: "x",
};
/**
 * FIXME: look-up how to do the TypeScript trick that computes combinations of types
 */
// const LanguageAndFrameworkToFileExtension: Record<ProgrammingLanguage | Framework, string> = {
//   "JavaScriptReact"
// };

interface FileExtensionConfig {
  language: ProgrammingLanguage;
  fileSpecialization?: FileSpecialization;
}

const getFileExtension = ({
  language,
  fileSpecialization,
}: FileExtensionConfig) =>
  `${ProgrammingLanguageToFileExtension[language]}${
    fileSpecialization
      ? FileSpecializationToFileExtension[fileSpecialization]
      : ""
  }`;

interface TestFileExtensionConfig extends FileExtensionConfig {
  testScope: TestScope;
}

const composeFileNameGenerator =
  ({ testScope, ...config }: TestFileExtensionConfig): FileNameGenerator =>
  ({ model }) =>
    `${model}.${TestScopeToFileEnding[testScope]}.${getFileExtension(config)}`;

export class BasicJestFileGenerator extends TemplateGenerator {
  constructor(testFileExtensionConfig: TestFileExtensionConfig) {
    super({
      shouldWriteFile: true,
      fileOptions: {
        fileName: composeFileNameGenerator(testFileExtensionConfig),
      },
    });
  }

  generate = ({ model }: Schema, _cfg: ExecutionContext) => {
    const template = `
import { ${model} } from "./${model}";

jest.mock();

describe(${model}.name, () => {
  it("should", () => {

  });
});
`;

    return template;
  };
}
