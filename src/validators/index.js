import { body } from "express-validator";

const userRegistrationValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty.withMessage("Email is required") //.withMessage sends the error msg when we get an error
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty.withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username should have atleast 3 characters")
      .isLength({ max: 13 })
      .withMessage("Username should not have more than 13 characters"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password cannot be empty"),
  ];
};

export { userRegistrationValidator };
