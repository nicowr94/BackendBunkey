import { Router } from "express";

const router = Router();

import * as authCtrl from "../controllers/auth.controller";
import { authJwt, verifySignup } from "../middlewares";

// Solo un usuario registrado y con perfl administrador puede crear usuarios
router.post(
  "/signup",
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkDuplicateNameOrEmail,
    verifySignup.checkRolesExisted,
  ],
  authCtrl.signup
);
router.post("/signin", authCtrl.signin);

module.exports = router;
