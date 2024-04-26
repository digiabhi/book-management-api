"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publicationYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [4], // Year must be of length 4 only
        },
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
