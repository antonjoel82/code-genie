/**
 * @returns the first type in the list.
 */
export type FirstTypeInList<T extends any[]> = T extends [
  infer Elem,
  ...infer _Ignore
]
  ? Elem
  : never;
