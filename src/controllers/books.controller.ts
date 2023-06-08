import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { IBook } from "../interfaces/book";
import { BooksServices } from "../services";
import { ApiError } from "../utils/apiError";
import { IResData } from "./types";

export class BooksControllers {
  booksService;

  constructor(booksService: BooksServices) {
    this.booksService = booksService;
  }

  getBooks = async (
    _req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const books = await this.booksService.getBooks();
      console.log({ books });
      res.status(httpStatus.OK).render("books", { books });
      // res.status(httpStatus.OK).json({ status: httpStatus[200], data: books });
    } catch (error) {
      next(error);
    }
  };

  getBook = async (
    req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<any> => {
    const { id } = req.params;
    console.log({ id });
    try {
      const book = await this.booksService.getBookById(+id);
      console.log({ book });
      res.status(httpStatus.OK).render("book", { book });
      // res.status(httpStatus.OK).json({ status: httpStatus["200"], book });
    } catch (error) {
      next(error);
    }
  };

  addNewBook = async (
    req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<any> => {
    const { title } = req.body;

    try {
      const books: IBook[] = await this.booksService.getBooks();

      let id = ++books[books.length - 1]["id"];
      books.push({
        id,
        title,
        isbn: "",
        subtitle: "",
        author: "",
        published: "",
      });

      this.booksService.addNewBookToFile(JSON.stringify(books));

      res
        .status(httpStatus.CREATED)
        .json({ status: "success", message: "Book added successfully!" });
    } catch (error) {
      next(error);
    }
  };
}

