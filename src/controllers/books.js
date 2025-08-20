const Book = require("../models/book");

const getBooks = (request, response) => {
  return Book.find({})
    .then((data) => {
      if (!data || data.length === 0) {
        return response.status(404).send("Книги не найдены");
      }

      response.status(200).send(data);
    })
    .catch((error) => response.status(500).send(error.message));
};

const getBookByID = (request, response) => {
  const { book_id } = request.params;

  return Book.findById(book_id)
    .then((book) => {
      if (!book) {
        return response.status(404).send("Книга не найдена");
      }

      response.status(200).send(book);
    })
    .catch((error) => response.status(500).send(error.message));
};

const createBook = (request, response) => {
  return Book.create({ ...request.body })
    .then((book) => {
      response.status(201).send(book);
    })
    .catch((error) => response.status(500).send(error.message));
};

const updateBook = (request, response) => {
  const { book_id } = request.params;

  return Book.findByIdAndUpdate(book_id, { ...request.body }, { new: true })
    .then((book) => {
      if (!book) {
        return response.status(404).send("Книга не найдена");
      }

      response.status(200).send(book);
    })
    .catch((error) => response.status(500).send(error.message));
};

const deleteBook = (request, response) => {
  const { book_id } = request.params;

  return Book.findByIdAndDelete(book_id)
    .then((book) => {
      if (!book) {
        return response.status(404).send("Книга не найдена");
      }

      response.status(200).send("Книга успешно удалёна");
    })
    .catch((error) => response.status(500).send(error.message));
};

module.exports = {
  getBooks,
  getBookByID,
  createBook,
  updateBook,
  deleteBook,
};
