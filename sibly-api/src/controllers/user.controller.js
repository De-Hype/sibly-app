//For updating pictures and stuff
//For deleting account

const AppError = require("../errors/AppError");
const catchAsync = require("../errors/catchAsync");
const bcryptjs = require("bcryptjs");
const GenerateToken = require("../helpers/GenerateToken");
const {
  ValidateUpdateUser,
} = require("../helpers/formValidation");
const User = require("../models/user.model");

module.exports.UpdateUser = catchAsync(async (req, res, next) => {
  // let { name, email, username, password } = req.body;
  const { error, value } = ValidateUpdateUser(req.body);
  if (error) {
    return next(new AppError(error, 402));
  }
  const id = req.user.id;
  console.log(value.password)
  console.log(value.confirmPassword)
  
  if (value.password !== value.confirmPassword) {
    return next(new AppError("Passwords do not match", 403));
  }
  const salt = await bcryptjs.genSalt(8);
  const hashedPassword = await bcryptjs.hash(value.password, salt);
  console.log(hashedPassword)
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { email:value.email, username:value.username, password: hashedPassword },
    { new: true }
  );

  const account = {
    id: updatedUser._id,
    name: updatedUser.name,
    username: updatedUser.username,
    email: updatedUser.email,
    lastActive: updatedUser.lastActive,
    friends: updatedUser.friends,
    image: updatedUser.profilePic,
  };
  const token = GenerateToken(account);

  res.status(202).json({
    status: "ok",
    success: "updated",
    message: "User has succesfully updated their account",
    token: token,
    account: account,
  });
});

module.exports.DeleteUser = catchAsync(async (req, res, next) => {
  const myId = req.user.id;
  const id = req.params.id;
  if (myId != id) {
    return next(new AppError("You are not allowed to delete this user", 403));
  }
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return next(new AppError("User not found", 404));
  }

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
  // console.log(req.session.account)
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

module.exports.GetMyDetails = catchAsync(async (req, res, next) => {
  // console.log("the getDetails endpoint")
  const myEmail = req.user.email;
  const email = req.body.email;
  // console.log(email)
  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    return next(new AppError("User has not been found", 404));
  }
  if (myEmail != user.email) {
    return next(
      new AppError("Not same user, can not show you details of another", 404)
    );
  }
  return res.status(200).json({
    status: "ok",
    success: "found",
    message: "Your account has been found succesfully",
    users: user,
  });
});
