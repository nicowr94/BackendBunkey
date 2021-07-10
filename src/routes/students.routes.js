import { Router } from "express";
const router = Router();

import * as studentsCtrl from "../controllers/student.controller";
import { authJwt } from "../middlewares/index";
import { checkDuplicateStudentName } from "../middlewares/verifyStudent";

//Para crear un estudiante se debe tener el rol de moderador o administrador
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator, checkDuplicateStudentName],
  studentsCtrl.createStudent
);

//Para solicitar datos de estudiante(s) solo se debe estar registrado
router.get("/", [authJwt.verifyToken], studentsCtrl.getStudents);
router.get("/:studentId", [authJwt.verifyToken], studentsCtrl.getStudentByID);

//Para modificar datos de estudiante(s) se debe tener el perfil de administrador
router.put(
  "/:studentId",
  [authJwt.verifyToken, authJwt.isAdmin],
  studentsCtrl.updateStudentByID
);
router.delete(
  "/:studentId",
  [authJwt.verifyToken, authJwt.isAdmin],
  studentsCtrl.deleteStudentByID
);

module.exports = router;
