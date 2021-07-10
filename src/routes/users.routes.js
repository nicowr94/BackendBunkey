import { Router } from "express";

const router = Router();

import * as userCtrl from "../controllers/user.controller";
import { authJwt, verifySignup } from "../middlewares";

// EndPoint para registrar usuario solo con perfl administrador
router.post(
  "/",
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkDuplicateNameOrEmail,
    verifySignup.checkRolesExisted,
  ],
  userCtrl.createUser
);

// EndPoint para obtener todos los usuario solo con perfl administrador
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], userCtrl.getUsers);

module.exports = router;
