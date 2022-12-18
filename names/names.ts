import { Schema } from "../core";
import { NameVariations } from "./NameVariations";

// PHASE ONE: Basic string manipulation
export const DASH = '-';
export const UNDERSCORE = '_';
export const SPACE = ' ';
export const EMPTY = '';

// casing
export const lowercase = (val: string) => val.toLowerCase();
export const uppercase = (val: string) => val.toUpperCase();
export const capitalize = (val: string) => val.charAt(0).toUpperCase() + val.slice(1);
export const decapitalize = (val: string) => val.charAt(0).toLowerCase() + val.slice(1);
export const capitalizeWords = (val: string) =>
  val.split(SPACE).map(capitalize).join(SPACE);

// replacing
export const replace = (val: string, targ: string, sub: string) => val.split(targ).join(sub);
export const stripDashes = (val: string) => replace(val, DASH, SPACE);
export const stripUnderscores = (val: string) => replace(val, UNDERSCORE, SPACE);
export const stripSpaces = (val: string) => replace(val, SPACE, EMPTY);
export const addDashes = (val: string) => replace(val, SPACE, DASH);
export const addUnderscores = (val: string) => replace(val, SPACE, UNDERSCORE);

// PHASE TWO: Functional programming FTW
const _pipe = (a, b) => (arg) => b(a(arg));
export const transformPipe = (...ops) => ops.reduce(_pipe);

// interlacing
export const strip = transformPipe(stripDashes, stripUnderscores);
export const startCase = transformPipe(strip, capitalizeWords);
export const pascalCase = transformPipe(startCase, stripSpaces);
export const camelCase = transformPipe(pascalCase, decapitalize);
export const kebabCase = transformPipe(strip, addDashes, lowercase);
export const snakeCase = transformPipe(strip, addUnderscores, lowercase);
export const constantCase = transformPipe(strip, addUnderscores, uppercase);

export const buildBase = (schema: Schema): NameVariations => ({
  ref: camelCase(schema.model),
  refs: camelCase(schema.modelPlural),
  model: pascalCase(schema.model),
  models: pascalCase(schema.modelPlural),
  selector: kebabCase(schema.model),
  selectors: kebabCase(schema.modelPlural),
});

export const buildSingleParam = (variations: NameVariations) => `${variations.ref}: ${variations.model}`;
export const buildMultiParam = (variations: NameVariations) => `${variations.refs}: ${variations.model}[]`;

export const addParams = (variations: NameVariations) => ({
  ...variations,
  singleParam: buildSingleParam(variations),
  multiParam: buildMultiParam(variations),
});

export const buildNameVariations = transformPipe(buildBase, addParams);
