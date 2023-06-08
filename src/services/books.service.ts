import httpStatus from "http-status";
import { ApiError } from "../utils/apiError.js";
import { __dirname } from "../app.js";
import { IBook } from "../interfaces/book.js";
import { FileUtils } from "../utils/files.js";

export class BooksServices {
  fileModule;

  constructor(fileModule: FileUtils) {
    this.fileModule = fileModule;
  }

  async getBooks(): Promise<any> {
    try {
      const books = await this.fileModule.readFile(
        this.fileModule.getAbsoluteFilePath({
          dirname: __dirname,
          filePath: "/store",
          fileName: "books.json",
        })
      );
      console.log({ books });
      return JSON.parse(books);
    } catch (err: any) {
      console.log({ err });
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  async getBookById(bookId: number): Promise<any> {
    try {
      const books = await this.fileModule.readFile(
        this.fileModule.getAbsoluteFilePath({
          dirname: __dirname,
          filePath: "/store",
          fileName: "books.json",
        })
      );
      const booksList = JSON.parse(books);
      return booksList.find((book: IBook) => book.id === +bookId);
    } catch (err: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async addNewBookToFile(books: string) {
    try {
      const result = await this.fileModule.writeToFile(
        this.fileModule.getAbsoluteFilePath({
          dirname: __dirname,
          filePath: "/store",
          fileName: "books.json",
        }),
        books
      );
      console.log({ result });
    } catch (err: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}

