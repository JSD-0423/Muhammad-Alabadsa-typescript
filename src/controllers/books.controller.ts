import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { BooksServices } from "../services";
import { BookModel } from "../models/books.model.js";
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
      const books = await this.booksService.finAllBooks();
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
      const book = await this.booksService.finBookById(+id);
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
  ): Promise<void> => {
    const bookData = req.body;

    try {
      const createdBook: BookModel = await this.booksService.createNewBook(
        bookData
      );

      res.status(httpStatus.CREATED).json({
        status: "success",
        message: "Book added successfully!",
        data: createdBook,
      });
    } catch (error) {
      next(error);
    }
  };

  updateBook = async (
    req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<void> => {
    const bookData = req.body;
    const id = req.params.id;

    try {
      const updatedBook: BookModel = await this.booksService.updateBook(
        +id,
        bookData
      );

      res.status(httpStatus.OK).json({
        status: "success",
        message: "Book updated successfully!",
        data: updatedBook,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteBook = async (
    req: Request,
    res: Response<IResData>,
    next: NextFunction
  ): Promise<void> => {
    const bookData = req.body;
    const id = req.params.id;

    try {
      await this.booksService.deleteBook(+id);

      res.status(httpStatus.OK).json({
        status: "success",
        message: "Book deleted successfully!",
      });
    } catch (error) {
      next(error);
    }
  };
}

