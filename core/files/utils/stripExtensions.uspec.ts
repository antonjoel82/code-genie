import { stripExtensions } from "./stripExtensions";

describe("stripExtensions", () => {
  it("should strip the file extensions from the passed in file names", () => {
    expect(stripExtensions("file.txt", "image.jpg", "document.pdf")).toEqual([
      "file",
      "image",
      "document",
    ]);
  });

  it("should return the file name if it does not have an extension", () => {
    expect(stripExtensions("README")).toEqual(["README"]);
  });

  it('should handle file names with multiple "." characters', () => {
    expect(stripExtensions("function.test.ts")).toEqual(["function.test"]);
  });

  it("should return an empty array if no file names are passed in", () => {
    expect(stripExtensions()).toEqual([]);
  });
});
