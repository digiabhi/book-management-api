const CrudRepository = require("./crud.repository");
const { Book } = require("../models");

class BookRepository extends CrudRepository {
  constructor() {
    super(Book);
  }

  // Function to get all the books
  async getAllBooks(filter, sort) {
    const response = await Book.findAll({
      where: filter,
      order: sort,
    });
    return response;
  }
}

module.exports = BookRepository;
