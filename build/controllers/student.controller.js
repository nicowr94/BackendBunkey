"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countCredits = exports.deleteStudentByID = exports.updateStudentByID = exports.getStudentByID = exports.getStudents = exports.createStudent = void 0;

var _Student = _interopRequireDefault(require("../models/Student"));

var _Enrollment = _interopRequireDefault(require("../models/Enrollment"));

var _Course = _interopRequireDefault(require("../models/Course"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createStudent = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var name, newStudent, StudentSaved;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = req.body.name;
            _context.prev = 1;
            newStudent = new _Student["default"]({
              name: name
            });
            _context.next = 5;
            return newStudent.save();

          case 5:
            StudentSaved = _context.sent;
            res.status(201).json(StudentSaved);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(401).json({
              message: "Incomplete data"
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));

  return function createStudent(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createStudent = createStudent;

var getStudents = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var student;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Student["default"].find();

          case 2:
            student = _context2.sent;
            res.status(201).json(student);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getStudents(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getStudents = getStudents;

var getStudentByID = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var student;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Student["default"].findById(req.params.studentId);

          case 2:
            student = _context3.sent;
            res.status(200).json(student);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getStudentByID(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getStudentByID = getStudentByID;

var updateStudentByID = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var updateStudent;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _Student["default"].findByIdAndUpdate(req.params.studentId, req.body, {
              "new": true
            });

          case 2:
            updateStudent = _context4.sent;
            res.status(200).json(updateStudent);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateStudentByID(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateStudentByID = updateStudentByID;

var deleteStudentByID = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var deleteStudent;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _Student["default"].findByIdAndDelete(req.params.studentId);

          case 2:
            deleteStudent = _context5.sent;
            res.status(204).json(deleteStudent);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteStudentByID(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); // Función para calcular los créditos totales del estudiante


exports.deleteStudentByID = deleteStudentByID;

var countCredits = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(idStudent) {
    var nuevoEnrolled, cursos, sumaCreditos;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _Enrollment["default"].aggregate([{
              $match: {
                students: {
                  $elemMatch: {
                    students: "60e7be2321d7ce613ca742ed"
                  }
                }
              }
            }, {
              $project: {
                userObjId: {
                  $toObjectId: "$course"
                }
              }
            }, {
              $lookup: {
                localField: "userObjId",
                from: "courses",
                foreignField: "_id",
                as: "arrayCourse"
              }
            }]);

          case 2:
            nuevoEnrolled = _context6.sent;
            cursos = nuevoEnrolled.map(function (elemento) {
              var elm = {
                course: elemento.arrayCourse[0].name,
                credit: elemento.arrayCourse[0].credit
              };
              return elm;
            });
            sumaCreditos = 0;
            cursos.forEach(function (e) {
              sumaCreditos += e.credit;
            }); //res.status(201).json({ credits: cursos , suma:sumaCreditos});

            return _context6.abrupt("return", sumaCreditos);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function countCredits(_x11) {
    return _ref6.apply(this, arguments);
  };
}();

exports.countCredits = countCredits;