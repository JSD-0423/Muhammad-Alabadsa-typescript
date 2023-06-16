import { param, check, body } from "express-validator";

export const validateId = [
  param("id", "id does not exist").isEmpty(),
  param("id", "Id Must be integer").isInt(),
  param("id").toInt(),
];

export const validateCreateBookBody = [
  body("isbn", "Isbn must not be empty").notEmpty().isString(),
  body("title", "Title must not be empty").notEmpty().isString(),
  body("author", "Title must not be empty").notEmpty().isString(),
];

