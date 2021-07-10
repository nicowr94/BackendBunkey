"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAdmi = exports.createRoles = void 0;

var _mongoose = require("mongoose");

var _Role = _interopRequireDefault(require("../models/Role"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createRoles = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var count, values;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Role["default"].estimatedDocumentCount();

          case 3:
            count = _context.sent;

            if (!(count > 0)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            _context.next = 8;
            return _mongoose.Promise.all([new _Role["default"]({
              name: "user"
            }).save(), new _Role["default"]({
              name: "moderator"
            }).save(), new _Role["default"]({
              name: "admin"
            }).save()]);

          case 8:
            values = _context.sent;
            console.log(values);
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function createRoles() {
    return _ref.apply(this, arguments);
  };
}();

exports.createRoles = createRoles;

var createAdmi = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var count, role, newAdmi, saveAdmin;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _User["default"].estimatedDocumentCount();

          case 3:
            count = _context2.sent;

            if (!(count > 0)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return");

          case 6:
            _context2.next = 8;
            return _Role["default"].findOne({
              name: "admin"
            });

          case 8:
            role = _context2.sent;
            _context2.t0 = _User["default"];
            _context2.next = 12;
            return _User["default"].encryptPassword("password");

          case 12:
            _context2.t1 = _context2.sent;
            _context2.t2 = role._id;
            _context2.t3 = {
              username: "admin",
              email: "admin@bunkey.com",
              password: _context2.t1,
              roles: _context2.t2
            };
            newAdmi = new _context2.t0(_context2.t3);
            _context2.next = 18;
            return newAdmi.save();

          case 18:
            saveAdmin = _context2.sent;
            console.log(saveAdmin);
            _context2.next = 25;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t4 = _context2["catch"](0);
            console.error(_context2.t4);

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 22]]);
  }));

  return function createAdmi() {
    return _ref2.apply(this, arguments);
  };
}();

exports.createAdmi = createAdmi;