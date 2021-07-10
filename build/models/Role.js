"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ROLES = void 0;

var _mongoose = require("mongoose");

var ROLES = ["admin", "user", "moderator"];
exports.ROLES = ROLES;
var roleSchema = (0, _mongoose.Schema)({
  name: String
}, {
  versionKey: false
});

var _default = (0, _mongoose.model)("Role", roleSchema);

exports["default"] = _default;