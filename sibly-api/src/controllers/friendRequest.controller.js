const catchAsync = require("../errors/catchAsync");
const AppError = require("../errors/AppError");
const User = require("../models/user.model");

module.exports.SendFriendRequest = catchAsync(async (req, res, next) => {
  // let { name, email, username, password } = req.body;
  //We will check for that users id and also check if the ID mathes with the one we get on the session
  //If they actually match, we go ahead and delete the account, and then destroy the session
  const userId  = req.user.id;
  console.log("This is your id", userId)

  const id  = req.params.id;
  console.log("The person you are adding", id)
  const reqSender = await User.findById(userId).select("-password");
  const reqReceiver = await User.findById(id).select("-password");
  //We will check if the personsId already exist in your friendRequestGotten list;
  //We will check if the personsId already exist on your friendReceived List;
  //We will check if the personsId exist on your friend List;
  //return res.json({reqSender:reqSender, reqReceiver:reqReceiver})
  if (reqSender.friendRequestGotten.includes(id)) {
    return next(
      new AppError("This user had already sent you a friend request", 400)
    );
  }
  if (reqSender.friendRequestSent.includes(id)) {
    return next(
      new AppError("You had already sent this user a friend request", 400)
    );
  }
  if (reqSender.friends.includes(id)) {
    return next(
      new AppError("Failed because this user is already your friend", 400)
    );
  }
  if (reqReceiver.friends.includes(userId)) {
    return next(
      new AppError("Failed because you are already this users friend", 400)
    );
  }
  if (reqReceiver.friendRequestSent.includes(userId)) {
    return next(
      new AppError("This user had already sent you a friend request", 400)
    );
  }
  if (reqReceiver.friendRequestGotten.includes(userId)) {
    return next(
      new AppError(
        "This user had already received a friend request from you.",
        400
      )
    );
  }
  await reqSender.friendRequestSent.push(id);
  await reqReceiver.friendRequestGotten.push(userId);
  await Promise.all([reqSender.save(), reqReceiver.save()]);

  return res.status(202).json({
    status: "ok",
    success: "sent",
    message: "Friend request has been sent succesfully",
    reqReceiver:reqReceiver,
    reqSender:reqSender
  });
});

module.exports.AcceptFriendRequest = catchAsync(async (req, res, next) => {
  const userId  = req.user.id;
  const id  = req.params.id;

  const reqSender = await User.findById(userId).select("-password");
  const reqReceiver = await User.findById(id).select("-password");
  //We will check if the personsId exist on your friend List;
  if (reqSender.friends.includes(id)) {
    return next(
      new AppError("Failed because this user is already your friend", 400)
    );
  }
  if (reqReceiver.friends.includes(userId)) {
    return next(
      new AppError("Failed because you are already this users friend", 400)
    );
  };
  
   reqSender.friendRequestSent.pull(id);
   reqSender.friendRequestGotten.pull(id);
   reqReceiver.friendRequestGotten.pull(userId);
   reqReceiver.friendRequestSent.pull(userId);
  

   reqSender.friends.push(id);
 reqReceiver.friends.push(userId);
  await Promise.all([reqSender.save(), reqReceiver.save()]);
  return res.status(202).json({
    status: "ok",
    success: "added",
    message: "Friend added succesfully",
    reqReceiver:reqReceiver,
    reqSender:reqSender
  });
});

module.exports.RemoveFriendRequest = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;
  return res.status(202).json({
    status: "ok",
    success: "added",
    message: "Friend added succesfully",
  });
});

module.exports.FetchFriendRequestGotten = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
 const requestGotten = await User.findById(userId).select("-password").populate({
  path:"friendRequestGotten",
  select:"-password"
}).exec(); 
if (!requestGotten){
  return next(
    new AppError("User has not been found", 400)
  );
};
  return res.status(202).json({
    status: "ok",
    success: "fetched",
    message: "Friend added succesfully",
    requestGotten:requestGotten.friendRequestGotten
  });
});