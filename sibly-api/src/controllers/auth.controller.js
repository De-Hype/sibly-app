//Register
//Login
//Logout
const catchAsync = require("../errors/catchAsync");
const AppError = require("../errors/AppError");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { ValidateSignUp, ValidateSignIn } = require("../helpers/formValidation");
const GenerateToken = require("../helpers/GenerateToken");

module.exports.SignUp = catchAsync(async (req, res, next) => {
  // let { name, email, username, password } = req.body;
  const { error, value } = ValidateSignUp(req.body);
  if (error) {
    return next(new AppError(error.message, 405));
  }
  const findUser = await User.findOne({ email: value.email });
  if (findUser) {
    return next(new AppError("User already exist", 400));
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
    googleId:null,
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
    console.log(error)
    return next(new AppError(error.message, 402));
  }

  const findUser = await User.findOne({ email: value.email });

  if (!findUser) {
    return next(new AppError("User does not exist", 404));
  }
  const isPasswordMatch = await bcryptjs.compare(
    value.password,
    findUser.password
  );
  if (!isPasswordMatch) {
    return next(new AppError("Incorrect login details", 400));
  }


  //Set up the session stuff here

  const account = {
    id: findUser._id,
    name: findUser.name,
    username: findUser.username,
    email:findUser.email,
    lastActive: findUser.lastActive,
    friends: findUser.friends,
    image: findUser.profilePic,
  };

  if (req.session.account) {
    req.session.regenerate((err) => {
      if (err) {
        return next(new AppError("Error generating new sessions", 500));
      } else {
        req.session.account = account;
      }
    });
  } else {
    req.session.account = account;
  }
  const token = GenerateToken(account)

  res.status(202).json({
    status: "ok",
    success: "logged",
    message: "User succesfully logged in",
    token:token,
    account: account,
  });
});



module.exports.CheckIfLoggedIn = catchAsync(async (req, res, next) => {
  const user = req.session.account;
  const userid = req.sessionID; 
  console.log(user);
  console.log(userid);
  res.status(202).json({
    status: "ok",
    success: "in",
    message: "User is logged in",
  });
});

module.exports.LogOut = catchAsync(async (req, res, next) => {
  const name = req.user.name
  //If we are using session
  // req.session.destroy((err) => {
  //   if (err) {
  //     return next(new AppError("Error logging user out ", 500));
  //   } else {
  //    return  res.status(202).json({
  //       status: "ok",
  //       success: "out",
  //       message: "User has  logged out",
  //     });
  //   }
  // });
  console.log(`A user with the name "${name}" has just logged out`)
  res.status(202).json({
           status: "ok",
           success: "out",
           message: "User has  logged out",
         });
});

module.exports.GoogleRedirect = catchAsync(async (req, res, next) => {
  
})