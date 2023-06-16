import Sequelize from "sequelize";
import {
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} from "../config/index.js";
import BookModel from "../models/books.model.js";

const sequelize = new Sequelize.Sequelize(
  DB_DATABASE as string,
  DB_USER as string,
  DB_PASSWORD as string,
  {
    dialect: "mysql",
    host: DB_HOST,
  }
);

sequelize.authenticate();

export const DB = {
  Books: BookModel(sequelize),
  sequelize,
  Sequelize,
};

