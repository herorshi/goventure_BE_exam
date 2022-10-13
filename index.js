var express = require("express");
var app = express();
var fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var cors = require("cors");
const corsConfig = {
  // origin: function(origin, callback) {
  //   return callback(null, true);
  // },
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsConfig));
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var bodyParser = require("body-parser");
app.use(bodyParser.json());

const { getRouter } = require("./router");
app.get("/s", (req, res) => {
  res.cookie("bsaSession", req.session.id, { httpOnly: false });
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.send("set");
});

app.get("/td", function(req, res) {
  res.cookie("name", "express");
  console.log("td");
  console.log(req.cookies, "req.cookies");
  res.end("end");
});

getRouter(app);
var server = app.listen(4000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Application Run At http://%s:%s;", host, port);
});
