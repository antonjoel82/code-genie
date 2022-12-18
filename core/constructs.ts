import { NameVariations } from "../names/NameVariations";

export interface BaseEntity {
  id?: string | null;
}

export interface Schema extends BaseEntity {
  model: string;
  modelPlural: string;
  description?: string;
  nameVariations?: NameVariations;
  props?: Prop[];
}

export interface Prop {
  [key: string]: any;
}

export type FileNameGenerator = (schema: Schema) => string;
export interface FileOptions {
  fileName?: string | FileNameGenerator;
  targetPath?: string;
}

// export interface Config<TemplateGeneratorType extends string = string> extends BaseEntity {
export interface GenerationContext extends BaseEntity {
  name?: string;
  application?: string;
  scope?: string;
}

export interface ExecutionConfig extends BaseEntity {
  shouldWriteFile?: boolean;
  fileOptions?: FileOptions;
}
