//Register
//Login
//Logout
const catchAsync = require("../errors/catchAsync");
const AppError = require("../errors/AppError");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { ValidateSignUp, ValidateSignIn } = require("../helpers/formValidation");

module.exports.SignUp = catchAsync(async (req, res, next) => {
  // let { name, email, username, password } = req.body;
  const { error, value } = ValidateSignUp(req.body);
  if (error) {
    return next(new AppError(error.message, 405));
  }
  const findUser = await User.findOne({ email: value.email });
  if (findUser) {
    return next(new AppError("User already exist", 402));
  }
  const salt = await bcryptjs.genSalt(8);
  const hashedPassword = await bcryptjs.hash(value.password, salt);

  const user = await User.create({
    name: value.name,
    email: value.email,
    username: value.username,
    password: hashedPassword,
    lastActive: new Date(),
    friends: [],
    profilePic: "",
  });

  return res.status(202).json({
    status: "ok",
    success: "created",
    message: "User account created succesfully",
    account: {
      id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    },
  });
});

module.exports.SignIn = catchAsync(async (req, res, next) => {
  const { error, value } = ValidateSignIn(req.body);
  if (error) {
    return next(new AppError(error.message, 402));
  }

  const user = await User.findOne({ email: value.email });
  if (!user) {
    return next(new AppError("User does not exist", 404));
  }
  const isPasswordMatch = await bcryptjs.compare(value.password, user.password);
  if (!isPasswordMatch) {
    return next(new AppError("Incorrect login details", 404));
  }
  //Set up the session stuff here
  req.session.regenerate((err) => {
    if (err) {
      return next(new AppError("Error generating new sessions", 500));
    } else {
      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        lastActive: user.lastActive,
        friends: user.friends,
        image: user.profilePic,
      };
    }
  });

  res.status(202).json({
    status: "ok",
    success: "logged",
    message: "User succesfully logged in",
    account: {
      id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      lastActive: user.lastActive,
      friends: user.friends,
      image: user.profilePic,
    },
  });
});

module.exports.LogOut = catchAsync(async (req, res, next) => {
  console.log(req.session.user);
  const account = req.session.user;
  res.status(202).json({
    status: "ok",
    success: "out",
    message: "Details fetched",
    user: account,
    expressStuff: req.session,
  });
  // req.session.destroy((err)=>{
  //     if(err){
  //         return next(new AppError("Error logging user out ", 500));
  //     } else{
  //         res.status(202).json({
  //             status: "ok",
  //             success:"out",
  //             message: "User has  logged out",
  //          });
  //     }
  // })
});
