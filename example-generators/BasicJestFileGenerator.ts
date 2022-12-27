import {
  Schema,
  ExecutionContext,
  FileNameGenerator,
  ExecutionConfig,
} from "../core";
import {
  ProgrammingLanguage,
  ProgrammingLanguageToFileExtension,
} from "../core/files";
import { TemplateGenerator } from "../template-generator/TemplateGenerator";
import { FirstParamType } from "../util";

export type TestScope = "integration" | "unit";
const TestScopeToFileEnding: Record<TestScope, string> = {
  integration: "ispec",
  unit: "uspec",
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

export interface TestFileExtensionConfig
  extends FileExtensionConfig,
    ExecutionConfig {
  testScope: TestScope;
}

const composeFileNameGenerator =
  ({ testScope, ...config }: TestFileExtensionConfig): FileNameGenerator =>
  ({ model }) =>
    `${model}.${TestScopeToFileEnding[testScope]}.${getFileExtension(config)}`;

export class BasicJestFileGenerator extends TemplateGenerator<TestFileExtensionConfig> {
  constructor(testFileExtensionConfig: TestFileExtensionConfig) {
    super({
      ...testFileExtensionConfig,
      shouldWriteFile: true,
      fileOptions: {
        fileName: composeFileNameGenerator(testFileExtensionConfig),
      },
    });

    const errMsgs = this.validateConstructorConfig(testFileExtensionConfig);
    if (errMsgs.length > 0) {
      throw new Error(errMsgs.join("\n"));
    }
  }

  protected validateConstructorConfig(
    config: FirstParamType<typeof BasicJestFileGenerator>
  ): string[] {
    const errMsgs: string[] = [];

    if (!config.language) {
      errMsgs.push("Must specify a language for the file.");
    }
    if (!config.testScope) {
      errMsgs.push("Must specify a test scope for the file.");
    }
    return errMsgs;
  }

  generate = ({ model }: Schema, _cfg: ExecutionContext) => {
    const template = `import { ${model} } from "./${model}";

jest.mock();

describe(${model}.name, () => {
  it("should", () => {

  });
});
`;

    return template;
  };
}
