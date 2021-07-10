import { Router } from "express";
const router = Router();

import * as coursesCtrl from "../controllers/course.controller";
import { authJwt } from "../middlewares/index";
import { checkDuplicateCourseName } from "../middlewares/verifyCourse";

//Para crear un curso se debe tener el rol de moderador o administrador
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator, checkDuplicateCourseName],
  coursesCtrl.createCourse
);

//Para solicitar curso(s) solo se debe estar registrado
router.get("/", [authJwt.verifyToken], coursesCtrl.getCourses);
router.get("/:courseId", [authJwt.verifyToken], coursesCtrl.getCourseByID);

//Para modificar los cursos se debe tener el perfil de administrador
router.put(
  "/:courseId",
  [authJwt.verifyToken, authJwt.isAdmin],
  coursesCtrl.updateCourseByID
);
router.delete(
  "/:courseId",
  [authJwt.verifyToken, authJwt.isAdmin],
  coursesCtrl.deleteCourseByID
);

module.exports = router;
