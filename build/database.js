"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost/database_bunkey"; //iniciar mongo con "mongod"

console.log(URI);

_mongoose["default"].connect(URI, {
  //URLSearchParams:true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});

var connection = _mongoose["default"].connection;
connection.once("open", function () {
  console.log("DB is connected");
});