const { response } = require("express");
const express = require("express");
const server = express();
const ejs = require("ejs");
const router = require("./routres/index");
const cookieParser = require("cookie-parser");

server.set("views", "./src/views");
server.engine("ejs", ejs.renderFile);

server.use(express.static("./src/public"));
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

server.use(router);
server.listen(8080, () => {
  console.log("servre is up and running on port 8040");
});
