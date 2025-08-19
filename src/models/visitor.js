const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  surname: {
    type: String,
    required: true,
    minLength: 2,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
  },
  borrowedBooks: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("visitor", visitorSchema);
