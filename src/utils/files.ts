import path, { PlatformPath } from "path";
import httpStatus from "http-status";

import { ApiError } from "./apiError.js";
import { FileSystem } from "../interfaces/globale";

export class FileUtils {
  fileModule;
  pathModule;

  constructor(fsMudule: FileSystem, pathModule: PlatformPath) {
    this.fileModule = fsMudule;
    this.pathModule = pathModule;
  }

  getAbsoluteFilePath({
    dirname,
    filePath,
    fileName,
  }: {
    dirname: string;
    filePath: string;
    fileName: string;
  }) {
    const absoluteFilePath = this.pathModule.resolve(
      this.pathModule.join(dirname, filePath, fileName)
    );

    return absoluteFilePath;
  }

  async checkFileExist(absoluteFilePath: string) {
    try {
      return this.fileModule.access(absoluteFilePath);
    } catch (error) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong!"
      );
    }
  }

  async readFile(absoluteFilePath: string): Promise<string> {
    try {
      const data = await this.fileModule.readFile(absoluteFilePath);
      return data.toString();
    } catch (err: any) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        err.message || "Something went wrong!"
      );
    }
  }

  async writeToFile(absoluteFilePath: string, data: string) {
    try {
      await this.fileModule.writeFile(absoluteFilePath, data);
    } catch (err: any) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong!"
      );
    }
  }
}

