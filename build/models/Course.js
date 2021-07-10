"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _strictTransportSecurity = _interopRequireDefault(require("helmet/dist/middlewares/strict-transport-security"));

var _mongoose = require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var courseSchema = (0, _mongoose.Schema)({
  name: {
    type: String,
    unique: true,
    required: true
  },
  credit: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Course", courseSchema);

exports["default"] = _default;