var express = require("express");
var app = express();
var fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var cors = require("cors");
var session = require("express-session");
app.use(session({ secret: "XASDASDA" }));
var ssn;
const corsConfig = {
  origin: function(origin, callback) {
    return callback(null, true);
  },
  // origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var bodyParser = require("body-parser");
app.use(bodyParser.json());

const { getRouter } = require("./router");

getRouter(app);
var server = app.listen(4000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Application Run At http://%s:%s;", host, port);
});
