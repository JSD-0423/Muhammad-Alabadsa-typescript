import { Router } from "express";
import { BooksControllers } from "../controllers/index.js";

import { IBooksRoute } from "./types";

class BooksRoute implements IBooksRoute {
  path = "/";
  router = Router();
  bookControllers;

  constructor(bookControllers: BooksControllers) {
    this.bookControllers = bookControllers;
    this.initializeRoutes();
  }

  initializeRoutes() {
    console.log("controllers");
    this.router.get(`${this.path}`, this.bookControllers.getBooks);
    this.router.get(`${this.path}:id`, this.bookControllers.getBook);
    this.router.post(`${this.path}`, this.bookControllers.addNewBook);
  }
}

export default BooksRoute;

