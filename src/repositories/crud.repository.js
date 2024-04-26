const { StatusCodes } = require("http-status-codes");

const AppError = require("../utils/errors/app-error");
const { Logger } = require("../config");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      Logger.error(`Something went wrong in create repo : ${error}`);
      throw error;
    }
  }

  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },
      });
      if (!response) {
        throw new AppError(
          "Not able to fund the resource",
          StatusCodes.NOT_FOUND
        );
      }
      return response;
    } catch (error) {
      Logger.error(`Something went wrong in create repo : ${error}`);
      throw error;
    }
  }

  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      if (!response) {
        throw new AppError(
          "Not able to fund the resource",
          StatusCodes.NOT_FOUND
        );
      }
      return response;
    } catch (error) {
      Logger.error(`Something went wrong in create repo : ${error}`);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      Logger.error(`Something went wrong in create repo : ${error}`);
      throw error;
    }
  }

  async update(id, data) {
    try {
      // data -> {col: value, ....}
      const checkExistence = await this.model.findByPk(id);
      if (!checkExistence) {
        throw new AppError("Book not found in database", StatusCodes.NOT_FOUND);
      }
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      Logger.error(`Something went wrong in create repo : ${error}`);
      throw error;
    }
  }
}

module.exports = CrudRepository;
