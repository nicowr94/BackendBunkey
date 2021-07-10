"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var enrollmentSchema = (0, _mongoose.Schema)({
  course: {
    type: String,
    required: true
  },
  students: [{
    students: {
      type: String,
      required: true
    },
    credits: [{
      type: Number
    }]
  }]
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Enrollment", enrollmentSchema);

exports["default"] = _default;