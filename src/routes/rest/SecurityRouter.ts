import { Router } from "express";
import {check} from "express-validator";
import { validateRequestParameters } from "../../RestMiddleware";
import cache from "../../utils/Cache";
import { securityController } from "../../controllers/rest/SecurityController";

const router = Router();

router.post("/sign-up", [
  check("email", "Email is required.").isEmail(),
  check("username", "Username is required.").not().isEmpty(),
  check("password", "Password is required.").not().isEmpty(),
  validateRequestParameters
], cache.route(), securityController.signUpAction);

router.post("/sign-in", [
  check("email", "Email is required.").isEmail(),
  check("password", "Password is required.").not().isEmpty(),
  validateRequestParameters
], cache.route(), securityController.signInAction);

export default router;
