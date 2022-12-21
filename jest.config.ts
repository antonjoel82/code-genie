import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  testRegex: "(/__tests__/.*|(\\.|/)(uspec|ispec))\\.(js|ts)$",
};

export default config;
