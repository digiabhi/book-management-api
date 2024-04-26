const express = require("express");

const { BookController } = require("../../controllers");

const { BookMiddlewares } = require("../../middlewares");

const router = express.Router();

// POST /api/v1/books/create
router.post(
  "/create",
  BookMiddlewares.validateCreateRequest,
  BookController.createBook
);

// GET /api/v1/books?publicationYear=2024
router.get("/", BookController.getAllBooks);

// GET /api/v1/books/:id
router.get("/:id", BookController.getBook);

// DELETE /api/v1/books/delete/:id
router.delete("/delete/:id", BookController.destroyBook);

// PATCH /api/v1/books/update/:id
router.patch("/update/:id", BookController.updateBook);

module.exports = router;
