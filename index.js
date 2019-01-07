const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const router = require("./router");
const app = express();

//db
mongoose.connect("mongodb://localhost:27017/auth");

//app
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
app.use(passport.initialize());
router(app);

//server
const PORT = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server listening on port : ${PORT}`);
});
