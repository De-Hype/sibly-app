//For updating pictures and stuff
//For deleting account

const AppError = require("../errors/AppError");
const catchAsync = require("../errors/catchAsync");
const { ValidateSignUp } = require("../helpers/formValidation");
const User = require("../models/user.model");

module.exports.UpdateUser = catchAsync(async (req, res, next) => {
  // let { name, email, username, password } = req.body;
  const { error, value } = ValidateSignUp(req.body);
  if (error) {
    return next(new AppError(error.message, 402));
  }

  return res.status(202).json({
    status: "ok",
    success: "created",
    message: "User account created succesfully",
    account: {
      id: user_id,
      name: user.name,
      email: user.email,
      username: user.username,
    },
  });
});

module.exports.DeleteUser = catchAsync(async (req, res, next) => {
  // let { name, email, username, password } = req.body;
  //We will check for that users id and also check if the ID mathes with the one we get on the session
  //If they actually match, we go ahead and delete the account, and then destroy the session
  //The
  const userId = req.params.id;

  req.session.destroy((err) => {
    if (err) {
      return next(new AppError("User session could not be destroyed ", 500));
    }
  });

  return res.status(202).json({
    status: "ok",
    success: "deleted",
    message: "User account deleted succesfully",
  });
});

module.exports.AddFriend = catchAsync(async (req, res, next) => {
  // let { name, email, username, password } = req.body;
  //We will check for that users id and also check if the ID mathes with the one we get on the session
  //If they actually match, we go ahead and delete the account, and then destroy the session

  return res.status(202).json({
    status: "ok",
    success: "added",
    message: "Friend added succesfully",
  });
});

module.exports.GetAllUsers = catchAsync(async (req, res, next) => {
  console.log(req.session.account)
  const users = await User.find().select("-password");
  
  return res.status(200).json({
    status: "ok",
    success: "fetched",
    message: "Users fetched succesfully",
    users: users,
  });
});

module.exports.GetSingleUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  return res.status(200).json({
    status: "ok",
    success: "fetched",
    message: "Users fetched succesfully",
    user: user,
  });
});

module.exports.SearchFriends = catchAsync(async (req, res, next) => {
  const id = req.session.user.id;
  const findUserFriends = await User.findOne({ id }).populate("friends");
  if (findUserFriends.length == 0)
    return next(new AppError("Friends not found", 404));

  return res.status(202).json({
    status: "ok",
    success: "found",
    message: "Friend has been found succesfully",
    friends: findUserFriends,
  });
});

module.exports.SearchUsers = catchAsync(async (req, res, next) => {
  const search = req.query.search;
  if (search == "" || undefined) {
    return next(
      new AppError("Please provide a value you are searching for", 417)
    );
  }
  const findUsers = await User.find({
    username: { $regex: search, $options: "i" },
  });
  if (findUsers.length == 0) {
    return next(new AppError("Users not found", 417));
  }
  return res.status(200).json({
    status: "ok",
    success: "found",
    message: "Users has been found succesfully",
    users: findUsers,
  });
});
