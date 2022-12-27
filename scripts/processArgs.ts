import minimist, { Opts } from "minimist";

const FIRST_PARAM_INDEX: number = 2;

type AliasDictionary = Opts["alias"];

export const DEFAULT_ALIASES: AliasDictionary = {
  path: ["p"],
  lang: ["l", "language"],
  spec: ["specialization"],
  name: ["n"],
};

const ALLOWED_UNLABELED_ARG = "name";

export interface ProcessArgsOptions {
  /** Alternative names / labels for a given command-line argument */
  aliases?: AliasDictionary;
  /** Command-line argument name that is permitted to be unnamed / unlabeled */
  allowedUnlabeledArg?: string | null;
}

const DEFAULT_PROCESS_ARGS_OPTIONS: ProcessArgsOptions = {
  aliases: DEFAULT_ALIASES,
  allowedUnlabeledArg: ALLOWED_UNLABELED_ARG,
};

export interface ProcessedArgs {
  primary: string;
  [key: string]: any;
}

/**
 * Parse a list of command-line arguments.
 *
 * @param argv list of arguments directly from process.argv.
 * @param options TODO: currently a placeholder.
 * @returns command-line arguments assembled into a look-up object
 */
export const processArgs = (
  argv: string[],
  {
    aliases,
    allowedUnlabeledArg,
  }: ProcessArgsOptions = DEFAULT_PROCESS_ARGS_OPTIONS
): ProcessedArgs => {
  // setup
  const aggregatedAllowedUnlabeledArgs: string[] = !allowedUnlabeledArg
    ? []
    : [allowedUnlabeledArg, ...aliases[allowedUnlabeledArg]];

  console.log({ aliases });
  const parsedArgs = minimist(argv.slice(FIRST_PARAM_INDEX), {
    alias: aliases,
  });

  // if there aren't any unnamed flags
  const model: string | undefined = aggregatedAllowedUnlabeledArgs.reduce(
    (outputVal, aliasName) => outputVal || parsedArgs[aliasName],
    parsedArgs._[0]
  );

  // if (!model) {
  //   throw new Error(
  //     "Error! No primary name provided for generating your file(s)."
  //   );
  // }

  // if (parsedArgs._.length > 1) {
  //   throw new Error("Error! Too many unlabeled arguments provided.");
  // }

  return {
    primary: model,
    ...parsedArgs,
  };
};
