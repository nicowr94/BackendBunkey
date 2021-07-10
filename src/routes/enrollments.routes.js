import { Router } from "express";
const router = Router();

import * as enrollmentCtrl from "../controllers/enrollment.controller";
import { authJwt } from "../middlewares/index";

//Para crear un enrollment se debe tener el rol de moderador o administrador
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  enrollmentCtrl.createEnrollment
);

//Para solicitar enrollment(s) solo se debe estar registrado
router.get("/", [authJwt.verifyToken], enrollmentCtrl.getEnrollments);
router.get("/:enrollmentId", [authJwt.verifyToken], enrollmentCtrl.getEnrollmentByID);

//Para modificar un enrollment se debe tener el perfil de administrador
router.put(
  "/:enrollmentId",
  [authJwt.verifyToken, authJwt.isAdmin],
  enrollmentCtrl.updateEnrollmentByID
);
router.delete(
  "/:enrollmentId",
  [authJwt.verifyToken, authJwt.isAdmin],
  enrollmentCtrl.deleteEnrollmentByID
);

module.exports = router;
