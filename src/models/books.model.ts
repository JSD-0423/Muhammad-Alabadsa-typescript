import { Sequelize, DataType, Model, Optional, DataTypes } from "sequelize";

import { IBook } from "../interfaces/book";

export type BookCreationAttributes = Optional<
  IBook,
  "id" | "isbn" | "title" | "subtitle" | "author" | "published"
>;

export class BookModel
  extends Model<IBook, BookCreationAttributes>
  implements IBook
{
  public id!: number;
  public isbn!: string;
  public title!: string;
  public subtitle!: string;
  public author!: string;
  public published!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof BookModel {
  BookModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtitle: {
        type: DataTypes.STRING,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      published: {
        type: DataTypes.DATE,
      },
    },
    { sequelize }
  );

  return BookModel;
}

