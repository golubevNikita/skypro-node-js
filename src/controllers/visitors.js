const Visitor = require("../models/visitor");

const getVisitors = (request, response) => {
  return Visitor.find({})
    .then((data) => {
      if (!data || data.length === 0) {
        return response.status(404).send("Посетители не найдены");
      }

      response.status(200).send(data);
    })
    .catch((error) => response.status(500).send(error.message));
};

const getVisitorByID = (request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  console.log(url);
  console.log(url.searchParams);

  const { visitor_id } = request.params;

  return Visitor.findById(visitor_id)
    .then((visitor) => {
      if (!visitor) {
        return response.status(404).send("Посетитель не найден");
      }

      response.status(200).send(visitor);
      console.log(response.json());
    })
    .catch((error) => response.status(500).send(error.message));
};

const createVisitor = (request, response) => {
  return Visitor.create({ ...request.body })
    .then((visitor) => {
      response.status(201).send(visitor);
    })
    .catch((error) => response.status(500).send(error.message));
};

const updateVisitor = (request, response) => {
  const { visitor_id } = request.params;

  return Visitor.findByIdAndUpdate(
    visitor_id,
    { ...request.body },
    { new: true }
  )
    .then((visitor) => {
      if (!visitor) {
        return response.status(404).send("Посетитель не найден");
      }

      response.status(200).send(visitor);
    })
    .catch((error) => response.status(500).send(error.message));
};

const deleteVisitor = (request, response) => {
  const { visitor_id } = request.params;

  return Visitor.findByIdAndDelete(visitor_id)
    .then((visitor) => {
      if (!visitor) {
        return response.status(404).send("Посетитель не найден");
      }

      response.status(200).send("Посетитель успешно удалён");
    })
    .catch((error) => response.status(500).send(error.message));
};

module.exports = {
  getVisitors,
  getVisitorByID,
  createVisitor,
  updateVisitor,
  deleteVisitor,
};
