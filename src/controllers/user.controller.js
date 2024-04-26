const { StatusCodes } = require("http-status-codes");

const { UserService } = require("../services");

const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 * POST : /signup
 * req-body {email: 'a@b.com', password: '1234'}
 */
async function signup(req, res) {
  try {
    const user = await UserService.create({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = user;
    SuccessResponse.status = StatusCodes.CREATED;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.status).json(ErrorResponse);
  }
}

async function signin(req, res) {
  try {
    const user = await UserService.signin({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = user;
    SuccessResponse.status = StatusCodes.OK;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.status).json(ErrorResponse);
  }
}

module.exports = {
  signup,
  signin,
};
