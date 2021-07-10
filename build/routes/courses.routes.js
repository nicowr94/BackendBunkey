"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = require("express");

var coursesCtrl = _interopRequireWildcard(require("../controllers/course.controller"));

var _index = require("../middlewares/index");

var _verifyCourse = require("../middlewares/verifyCourse");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
//Para crear un curso se debe tener el rol de moderador o administrador
router.post("/", [_index.authJwt.verifyToken, _index.authJwt.isModerator, _verifyCourse.checkDuplicateCourseName], coursesCtrl.createCourse); //Para solicitar curso(s) solo se debe estar registrado

router.get("/", [_index.authJwt.verifyToken], coursesCtrl.getCourses);
router.get("/:courseId", [_index.authJwt.verifyToken], coursesCtrl.getCourseByID); //Para modificar los cursos se debe tener el perfil de administrador

router.put("/:courseId", [_index.authJwt.verifyToken, _index.authJwt.isAdmin], coursesCtrl.updateCourseByID);
router["delete"]("/:courseId", [_index.authJwt.verifyToken, _index.authJwt.isAdmin], coursesCtrl.deleteCourseByID);
module.exports = router;