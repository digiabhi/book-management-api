const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { checkYear } = require("../utils/helpers");
function validateCreateRequest(req, res, next) {
  if (!req.body.title) {
    ErrorResponse.message = "Something went wrong while creating book";
    ErrorResponse.error = new AppError(
      ["title not found in the oncoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.author) {
    ErrorResponse.message = "Something went wrong while creating book";
    ErrorResponse.error = new AppError(
      ["author not found in the oncoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.publicationYear) {
    ErrorResponse.message = "Something went wrong while creating book";
    ErrorResponse.error = new AppError(
      ["publicationYear not found in the oncoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  const yearValidation = checkYear(req.body.publicationYear);
  if (!yearValidation.success) {
    ErrorResponse.message = "Something went wrong while creating book";
    ErrorResponse.error = new AppError(
      [yearValidation.error],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
