import { asyncHandler } from "../utils/async-handler";
import { userRegistrationValidator } from "../validators/index.js";
import { ApiError } from "../utils/api-error.js";
import crypto from "crypto";
import { emailVerificationMailGenContent, forgotPasswordMailGenContent, sendMail } from "../utils/mail.js"
import { ApiResponse } from "../utils/api-response.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { cookie } from "express-validator";

const registerUser = asyncHandler(async (req, res) => {
  //Get user data
  const { email, username, password, role } = req.body;

  //Data validation
  userRegistrationValidator();

  try {
    //Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json(new ApiError(400, "User already exists"))
    }

    //Create new user
    const user = User.create({ email, username, password, role });
    
    if (!user) {
      return res.status(400).json(new ApiError(400, "User cannot be created"))
    }

    //Create verification token
    const token = crypto.randomBytes(32).toString("hex");

    user.emailVerificationToken = token;
    user.emailVerificationExpiry = Date.now() + 24 * 60 * 60 * 1000;
    
    //Save user
    await user.save()

    //Send verification mail
    const verificationUrl = `http://127.0.0.1:8000/api/v1/verify/${token}`

    const emailContent = emailVerificationMailGenContent(username, verificationUrl)

    const emailSubject = "Verify your email"

    sendMail(
      user.email,
      emailSubject,
      emailContent
    )

    res.status(201).json(new ApiResponse(201, {username, email, role}, {message: "User registered successfully"}))

  } catch (error) {
    return res.status(400).json(
      new ApiError(400, "User registration failed", error)
    )
  }

});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  //validation
  userLoginValidator();

  
  try {
    //find user
    const user = User.findOne({email})

    if (!user) {
      return res.status(400).json(new ApiError(400, "Invalid email or password"))
    }

    //Check password
    if (!user.isPasswordCorrect()) {
      return res.status(400).json(new ApiError(400, "Invalid email or password"))
    }

    //Generate login token
    const accessToken = jwt.sign({ id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
    )

    const refreshToken = jwt.sign({ id: user._id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
    )

    const cookieOptions = {
      httpOnly: true, //Gives cookie control to backend such that user can't interfere with it easily
      secure: true, //Making the cookies secure
      maxAge: 24*60*60*1000 // Max age of cookies
    }

    res.cookie("access", accessToken, cookieOptions)
    res.cookie("refresh", refreshToken, cookieOptions)

    res.status(201).json(new ApiResponse(201, {email, username}, "User login successful"))

  } catch (error) {
    return res.status(400).json(new ApiError(400, "User login failed", error))
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //clear access and refresh tokens
  res.cookie("access", null, {
    expiresIn: new Date(0)
  })

  res.cookie('refresh', null, {
    expiresIn: new Date(0)
  })
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const resendEmailVerification = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});
const resetForgottenPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

  export { registerUser, loginUser, logoutUser, verifyEmail, resendEmailVerification, resetForgottenPassword, refreshAccessToken, forgotPasswordRequest, changeCurrentPassword, getCurrentUser }
