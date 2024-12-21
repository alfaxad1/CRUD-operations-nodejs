const express = require("express");
const users = require("./users");
const validate = require("./validator");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//get all the users
app.get("/api/users", (req, res) => {
  res.send(users);
});

//get a user by id
app.get("/api/users/:id", (req, res) => {
  //check if the user exists, if not return 404, if exists return the use(user)
  const user = users.find((user) => {
    return user.id === parseInt(req.params.id);
  });

  if (!user) {
    res.status(404).send("User not found");
  }
  res.send(user);
});

app.post("/api/users", validate, (req, res) => {
  // validate in this case is using the function defined in
  // validator.js file to validate the client request
  const newUser = {
    id: users.length + 1,
    ...req.body,
  };
  users.push(newUser);
  res.send(newUser);
});

app.put("/api/users/:id", validate, (req, res) => {
  // validate in this case is using the function defined in
  // validator.js file to validate the client request

  //check if the user exists, if not return 404, if exists update
  const user = users.find((user) => {
    return user.id === parseInt(req.params.id);
  });

  if (!user) {
    res.status(404).send("User not found");
  }

  //update the user and return the updated user
  user.name = req.body.name;
  res.send(user.name);
});

app.delete("/api/users/:id", (req, res) => {
  //check if the user exists, if not return 404, if exists delete
  const user = users.find((user) => {
    return user.id === parseInt(req.params.id);
  });

  if (!user) {
    res.status(404).send("User not found");
  }

  //delete
  const index = users.indexOf(user);
  users.splice(index, 1);

  //return the user
  res.send(user);
});

module.exports = app;
