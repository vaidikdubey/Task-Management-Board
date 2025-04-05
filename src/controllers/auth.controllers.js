import { asyncHandler } from "../utils/async-handler";

const registerUser = asyncHandler(async (req, res) => {
  //Get user data
  const { email, username, password, role } = req.body;

  //Data validation
  registrationValidation(body);
});

export { registerUser };