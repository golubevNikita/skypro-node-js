const router = require("express").Router();

const {
  getBooks,
  getBookByID,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/books");

router.get("/library/books", getBooks);
router.get("/library/books/:book_id", getBookByID);

router.post("/library/books/new-item", createBook);

router.patch("/library/modification/books/:book_id", updateBook);

router.delete("/library/removal/books/:book_id", deleteBook);

module.exports = router;
