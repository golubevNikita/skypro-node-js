const http = require("http");
const getUsers = require("./modules/users");
const capitalize = require("./modules/capitalize");

const server = http.createServer((request, response) => {
  const usersObj = JSON.parse(getUsers().toString("utf-8"));

  const localhost = "http://127.0.0.1";
  const url = new URL(request.url, localhost);

  const usersParameter = url.searchParams.get("users");
  const userNameParameter = url.searchParams.get("hello");

  if (request.url === "/") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.write("Hello, world");
    response.end();

    return;
  }

  if (usersParameter === "") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();

    return;
  }

  if (userNameParameter === "") {
    response.status = 400;
    response.statusMessage = "FALSE";
    response.header = "Content-Type: text/plain";
    response.write("Enter a name");
    response.end();

    return;
  }

  if (userNameParameter) {
    const searchedUser = usersObj.filter(
      (user) => user.name.toLowerCase() === userNameParameter.toLowerCase()
    );

    if (searchedUser.length) {
      response.status = 200;
      response.statusMessage = "OK";

      const searchedIdOrIds = searchedUser.map((user) => user.id);

      let finalGreetings = `Hello, ${capitalize(userNameParameter)}`;

      searchedUser.length > 1
        ? (finalGreetings = `${finalGreetings} (users ids: ${searchedIdOrIds.join(
            ", "
          )})`)
        : (finalGreetings = `${finalGreetings} (${searchedUser[0].id})`);

      response.header = "Content-Type: text/plain";
      response.write(finalGreetings);
      response.end();

      return;
    } else {
      response.status = 400;
      response.statusMessage = "FALSE";
      response.header = "Content-Type: text/plain";
      response.write("Name is not exist");
      response.end();

      return;
    }
  } else {
    response.status = 500;
    response.statusMessage = "FALSE";
    response.header = "Content-Type: text/plain";
    response.write("");
    response.end();

    return;
  }
});

const port = 3003;

server.listen(port, () => {
  console.log(`Сервер запущен, url: http://127.0.0.1:${port}/`);
});
