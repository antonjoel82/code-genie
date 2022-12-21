import { writeOrAppendFile } from "./writeOrAppendFile";
import * as fs from "fs";

jest.mock("fs");

const mockedFs = fs as jest.Mocked<typeof fs>;

describe("writeOrAppendFile", () => {
  const basePath = "./data";
  const fileName = "test.txt";
  const filePath = "data/test.txt";
  const content = "This is a test";

  afterEach(() => {
    // reset the mock implementations after each test
    jest.resetAllMocks();
  });

  it("should create the file and write to it if it does not exist", () => {
    mockedFs.existsSync.mockReturnValue(false);

    writeOrAppendFile({ fileName, content, basePath });

    expect(mockedFs.existsSync).toHaveBeenCalledWith(filePath);
    expect(mockedFs.mkdirSync).toHaveBeenCalledWith(basePath, {
      recursive: true,
    });
    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(filePath, content);
  });

  it("should append to the file if it already exists", () => {
    // mock the necessary functions to test the 'append' scenario
    mockedFs.existsSync.mockReturnValue(true);

    writeOrAppendFile({ fileName, content, basePath });

    expect(mockedFs.existsSync).toHaveBeenCalledWith(filePath);
    expect(mockedFs.mkdirSync).not.toHaveBeenCalled();
    expect(mockedFs.appendFileSync).toHaveBeenCalledWith(filePath, content);
  });
});
