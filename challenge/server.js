const express = require("express");
const { home } = require("./templates.js");

const server = express();

const posts = [];

server.get("/", (req, res) => {
  const body = home(posts);
  res.send(body);
});

server.post("/", express.urlencoded({ extended: false }), (req, res) => {
  const nickname = req.body.nickname;
  const message = req.body.message;
  const created = Date.now();

  const errors = {};

  if (!nickname) {
    errors.nickname = "Please enter your nickname.";
  }

  if (!message) {
    errors.message = "Please enter a message.";
  }

  if (Object.keys(errors).length > 0) {
    // There are validation errors, re-render the form with error messages
    res.status(400).send(home(posts, errors, { nickname, message }));
  } else {
    // No validation errors, add the post
    posts.push({ nickname, message, created });
    res.redirect("/");
  }
});

module.exports = server;
