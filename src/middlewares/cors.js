const cors = (request, response, next) => {
  response.header("Access-Control-Allow-Origin", "http://localhost");

  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  response.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, HEAD, OPTIONS"
  );

  next();
};

module.exports = cors;
