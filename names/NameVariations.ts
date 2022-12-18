export interface NameVariations {
  /** variable reference to the model */
  ref: string;
  refs: string;
  /** the primary construct's name (PascalCase) */
  model: string;
  models: string;
  selector: string;
  selectors: string;
  modelParam?: string;
  modelsParam?: string;
}