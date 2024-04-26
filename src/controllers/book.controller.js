const { StatusCodes } = require("http-status-codes");

const { BookService } = require("../services");

const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 * POST : /books
 * req-body {title: 'book title', author: 'book author', publicationYear: 2004}
 */
async function createBook(req, res) {
  try {
    const book = await BookService.createBook({
      title: req.body.title,
      author: req.body.author,
      publicationYear: req.body.publicationYear,
    });
    SuccessResponse.data = book;
    SuccessResponse.status = StatusCodes.CREATED;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.status).json(ErrorResponse);
  }
}

/**
 * GET : /books
 * req-body {}
 */
async function getAllBooks(req, res) {
  try {
    const books = await BookService.getAllBooks(req.query);
    SuccessResponse.data = books;
    SuccessResponse.status = StatusCodes.OK;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.status).json(ErrorResponse);
  }
}

/**
 * GET : /books/:id
 * req-body {}
 */
async function getBook(req, res) {
  try {
    const book = await BookService.getBook(req.params.id);
    SuccessResponse.data = book;
    SuccessResponse.status = StatusCodes.OK;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.status).json(ErrorResponse);
  }
}

/**
 * DELETE : /books/:id
 * req-body {}
 */
async function destroyBook(req, res) {
  try {
    const books = await BookService.destroyBook(req.params.id);
    SuccessResponse.data = books;
    SuccessResponse.status = StatusCodes.OK;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.status).json(ErrorResponse);
  }
}

/**
 * PATCH : /books/:id
 * req-body {publicationYear: 2021}
 */
async function updateBook(req, res) {
  try {
    const books = await BookService.updateBook(req.params.id, req.body);
    SuccessResponse.data = books;
    SuccessResponse.status = StatusCodes.OK;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.status).json(ErrorResponse);
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBook,
  destroyBook,
  updateBook,
};
