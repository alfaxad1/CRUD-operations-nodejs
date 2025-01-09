const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const validate = require("./middlewares/validator");
const { authorize } = require("./middlewares/authorize");
const {
  getUsers,
  createUser,
  updateUser,
  getUser,
  deleteUser,
  getUserRoles,
} = require("./database");

//get all the users
app.get("/api/users", async (req, res) => {
  const users = await getUsers();
  res.json({ users });
});

//get a user by id
app.get("/api/users/:id", async (req, res) => {
  //check if the user exists, if not return 404, if exists return the user
  const users = await getUsers();
  const user = users.find((user) => {
    return user.id === parseInt(req.params.id);
  });

  if (!user) {
    res.status(404).send("User not found");
  }
  res.send(user);
});

//create a new user
app.post("/api/users", async (req, res) => {
  // validate in this case is using the function defined in
  // validator.js file to validate the client request
  const { name, age } = req.body;
  const user = await createUser(name, age);

  res.status(201).json({ user });
});

app.put("/api/users/:id", validate, async (req, res) => {
  // validate in this case is using the function defined in
  // validator.js file to validate the client request

  //check if the user exists, if not return 404, if exists update
  const users = await getUsers();

  const user = users.find((user) => {
    return user.id === parseInt(req.params.id);
  });

  if (!user) {
    res.status(404).send("User not found");
  }

  //update the user and return the updated user
  updateUser(req.body.name, req.body.age, req.params.id);
  const updatedUser = await getUser(req.params.id);
  res.send(updatedUser);
});

app.delete("/api/users/:id", async (req, res) => {
  //check if the user exists, if not return 404, if exists delete
  const users = await getUsers();
  const user = users.find((user) => {
    return user.id === parseInt(req.params.id);
  });

  if (!user) {
    res.status(404).send("User not found");
  }

  //delete
  deleteUser(req.params.id);

  //return all users
  const deletedUser = await getUser(req.params.id);
  res.send(deletedUser);
});

app.get("/api/userRole", async (req, res) => {
  const user = await getUserRoles;
  res.send(user);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send(500).send("something broke!");
  next();
});

module.exports = app;
