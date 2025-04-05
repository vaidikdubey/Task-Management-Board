import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middlewares.js";
import { userRegistrationValidator } from "../validators/index.js";

const router = Router();

//Array returned from calling userRegistrationValidator() will be directly passed to validate
router
  .route("/register")
  .post(userRegistrationValidator(), validate, registerUser);

export default router;
