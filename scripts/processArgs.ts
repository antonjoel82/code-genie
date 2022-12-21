import minimist from "minimist";

const FIRST_PARAM_INDEX: number = 2;

const ALIASES: Record<string, string | string[]> = {
  path: ["p"],
  lang: ["l", "language"],
  spec: ["specialization"],
  name: ["n", "model"],
};

const ALLOWED_UNLABELED_ARG = "name";
const ALLOWED_UNLABELED_ARGS = [
  ALLOWED_UNLABELED_ARG,
  ...ALIASES[ALLOWED_UNLABELED_ARG],
];

export interface ProcessedArgs {
  primary: string;
  [key: string]: any;
}

export const processArgs = (argv: string[]): ProcessedArgs => {
  const parsedArgs = minimist(argv.slice(FIRST_PARAM_INDEX), {
    alias: ALIASES,
  });

  // if there aren't any unnamed flags
  const model: string | undefined = ALLOWED_UNLABELED_ARGS.reduce(
    (outputVal, aliasName) => outputVal || parsedArgs[aliasName],
    parsedArgs._[0]
  );

  if (!model) {
    throw new Error(
      "Error! No primary name provided for generating your file(s)."
    );
  }

  if (parsedArgs._.length > 1) {
    throw new Error("Error! Too many unlabeled arguments provided.");
  }

  return {
    primary: model,
    ...parsedArgs,
  };
};
