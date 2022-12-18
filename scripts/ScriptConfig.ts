import { TemplateGeneratorDictionary } from "../template-generator";

export interface ScriptConfig<TemplateGeneratorType extends string> {
  generators: TemplateGeneratorDictionary<TemplateGeneratorType>;
}