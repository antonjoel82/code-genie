/**
 * Strip the file extensions from passed in file names.
 */
export const stripExtensions = (...files: string[]) =>
  files.map((fileName) => {
    const split = fileName.split(".");
    return split.length <= 1 ? fileName : split.slice(0, -1).join(".");
  });
