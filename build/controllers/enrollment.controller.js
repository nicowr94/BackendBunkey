"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteEnrollmentByID = exports.updateEnrollmentByID = exports.getEnrollmentByID = exports.getEnrollments = exports.createEnrollment = void 0;

var _Enrollment = _interopRequireDefault(require("../models/Enrollment"));

var _Course = _interopRequireDefault(require("../models/Course"));

var _Student = _interopRequireDefault(require("../models/Student"));

var _student = require("../controllers/student.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createEnrollment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, nameCourse, nameStudent, course, student, creditTotal, newEnrollment, enrollmentSaved;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, nameCourse = _req$body.nameCourse, nameStudent = _req$body.nameStudent;
            _context.prev = 1;
            _context.next = 4;
            return _Course["default"].findOne({
              name: nameCourse
            });

          case 4:
            course = _context.sent;

            if (course) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: "Course not found"
            }));

          case 7:
            _context.next = 9;
            return _Student["default"].findOne({
              name: nameStudent
            });

          case 9:
            student = _context.sent;

            if (student) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: "Student not found"
            }));

          case 12:
            _context.next = 14;
            return (0, _student.countCredits)(student._id);

          case 14:
            creditTotal = _context.sent;
            console.log("creditTotal " + creditTotal);
            console.log(course);
            newEnrollment = new _Enrollment["default"]({
              course: course._id,
              students: [{
                students: student._id,
                credits: [creditTotal]
              }]
            });
            _context.next = 20;
            return newEnrollment.save();

          case 20:
            enrollmentSaved = _context.sent;
            res.status(201).json(enrollmentSaved);
            _context.next = 28;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);
            return _context.abrupt("return", res.status(401).json({
              message: "Incomplete data"
            }));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 24]]);
  }));

  return function createEnrollment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createEnrollment = createEnrollment;

var getEnrollments = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var enrollment;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Enrollment["default"].find();

          case 2:
            enrollment = _context2.sent;
            res.status(201).json(enrollment);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getEnrollments(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getEnrollments = getEnrollments;

var getEnrollmentByID = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var enrollment;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Enrollment["default"].findById(req.params.enrollmentId);

          case 2:
            enrollment = _context3.sent;
            res.status(200).json(enrollment);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getEnrollmentByID(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getEnrollmentByID = getEnrollmentByID;

var updateEnrollmentByID = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var updateEnrollment;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _Enrollment["default"].findByIdAndUpdate(req.params.enrollmentId, req.body, {
              "new": true
            });

          case 2:
            updateEnrollment = _context4.sent;
            res.status(200).json(updateEnrollment);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateEnrollmentByID(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateEnrollmentByID = updateEnrollmentByID;

var deleteEnrollmentByID = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var deleteEnrollment;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _Enrollment["default"].findByIdAndDelete(req.params.enrollmentId);

          case 2:
            deleteEnrollment = _context5.sent;
            res.status(204).json(deleteEnrollment);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteEnrollmentByID(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteEnrollmentByID = deleteEnrollmentByID;