const express = require("express");

const { InfoController } = require("../../controllers");

const bookRoutes = require("./book.routes");

const userRouter = require("./user.routes");
const { AuthRequestMiddlewares } = require("../../middlewares");

const router = express.Router();

router.use("/books", [AuthRequestMiddlewares.checkAuth], bookRoutes);
router.use("/users", userRouter);
router.get("/info", InfoController.info);

module.exports = router;
