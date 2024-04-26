const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const { BookRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const bookRepository = new BookRepository();

async function createBook(data) {
  try {
    const book = await bookRepository.create(data);
    return book;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Book object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllBooks(query) {
  const customFilter = {};
  let sortFilter = [];

  // publicationYear=2022
  if (query.publicationYear) {
    const year = query.publicationYear;
    customFilter.publicationYear = {
      [Op.eq]: year,
    };
  }

  // author=Jake Billiard
  if (query.author) {
    customFilter.author = {
      [Op.like]: query.author,
    };
  }

  // sort=author_desc,publicationYear_asc
  if (query.sort) {
    const params = query.sort.split(",");
    const sortFilters = params.map((param) => param.split("_"));
    sortFilter = sortFilters;
  }
  try {
    const books = await bookRepository.getAllBooks(customFilter, sortFilter);
    return books;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the books",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getBook(id) {
  try {
    const book = await bookRepository.get(id);
    return book;
  } catch (error) {
    if (error.status === StatusCodes.NOT_FOUND) {
      throw new AppError("The book you requested is not present", error.status);
    }
    throw new AppError(
      "Cannot fetch data of all the book",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyBook(id) {
  try {
    const response = await bookRepository.destroy(id);
    if (response === 1) {
      return "Book deleted successfully";
    } else {
      return "Cannot delete book";
    }
  } catch (error) {
    if (error.status === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The book you requested to delete is not present",
        error.status
      );
    }
    throw new AppError(
      "Cannot fetch data of all the books",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateBook(id, data) {
  try {
    const response = await bookRepository.update(id, data);
    if (response[0] === 1) {
      return "Book data updated successfully";
    } else {
      return "Cannot update book data";
    }
  } catch (error) {
    if (error.status === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The book you requested to update is not present",
        error.status
      );
    }
    throw new AppError(
      "Cannot fetch data of all the books",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBook,
  destroyBook,
  updateBook,
};
