const express = require("express");
const cors = require("cors");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const getProfile = require("./controllers/getProfile");
const findface = require("./controllers/findFace");
require("dotenv").config();

const bodyParser = require("body-parser");
const app = express();
const knex = require("knex");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "smartbrain",
  },
});

app.get("/", (req, res) => {
  db.select("*")
    .from("users")
    .then((data) => {
      res.json("it working");
    })
    .catch(console.log);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt, saltRounds);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt, saltRounds);
});

app.get("/profile/:id", (req, res) => {
  getProfile.handleGetProfile(req, res, db);
});

app.put("/findface", (req, res) => {
  findface.incrementUserFaceCount(req, res, db);
});

app.listen(process.env.PORT || 3000);

// app.post("/findfaceurl", (req, res) => {
//   findface.handleApiCall(req, res);
// });

/*
1 --> / home its working
2 --> /signin POST = success/fail
3 --> /register --> POST = new user
4 --> /profile/:userId =GET-user
5 --> /image rank =PUT

*/
