import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import { DB } from "../databases/index.js";

import { BooksControllers } from "../controllers/index.js";
import { BooksServices } from "../services/index.js";
import { FileUtils } from "../utils/files.js";
import BooksRoute from "./books.route.js";

const router = Router();
const fileUtils = new FileUtils(fs, path);
const bookServices = new BooksServices(DB.Books);
const bookControllers = new BooksControllers(bookServices);

const booksRoute = new BooksRoute(bookControllers);

router.use("/books", booksRoute.router);

export default router;

