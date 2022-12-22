import { FirstTypeInList } from "./FirstTypeInList";

/**
 * @returns the type of the first parameter
 * - of a class' constructor if the passed-in type is a class
 * - of a function if the passed-in type is a function
 * Otherwise, returns never;
 *
 * @requires ClassOrFunctionType to be a class or a function type.
 */
export type FirstParamType<
  ClassOrFunctionType extends
    | ((...args: any[]) => any)
    | (abstract new (...args: any[]) => any)
> = ClassOrFunctionType extends abstract new (
  ...args: infer ConstructorParams
) => any
  ? FirstTypeInList<ConstructorParams>
  : ClassOrFunctionType extends (...args: infer FunctionParams) => any
  ? FirstTypeInList<FunctionParams>
  : never;
