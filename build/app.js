"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../package.json"));

var _initialSetup = require("./libs/initialSetup");

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _users = _interopRequireDefault(require("./routes/users.routes"));

var _students = _interopRequireDefault(require("./routes/students.routes"));

var _courses = _interopRequireDefault(require("./routes/courses.routes"));

var _enrollments = _interopRequireDefault(require("./routes/enrollments.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
(0, _initialSetup.createRoles)(); //iniciar el app con los roles

(0, _initialSetup.createAdmi)(); //iniciar el app con una administrador definido

app.set("pkg", _package["default"]); //settings

app.set("port", process.env.PORT || 4000);
app.use((0, _morgan["default"])("dev")); //middlewares

app.use((0, _cors["default"])());
app.use(_express["default"].json()); //routes

app.get("/", function (req, res) {
  res.status(200).json({
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version
  });
});
app.use("/api/auth", _auth["default"]);
app.use("/api/users", _users["default"]);
app.use("/api/students", _students["default"]);
app.use("/api/courses", _courses["default"]);
app.use("/api/enrollments", _enrollments["default"]);
var _default = app;
exports["default"] = _default;