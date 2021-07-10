"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var studentSchema = (0, _mongoose.Schema)({
  name: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Student", studentSchema);

exports["default"] = _default;