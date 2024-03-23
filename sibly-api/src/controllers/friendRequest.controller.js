const catchAsync = require("../errors/catchAsync");
const AppError = require("../errors/AppError");

module.exports.SendFriendRequest = catchAsync(async (req, res, next) => {
  // let { name, email, username, password } = req.body;
  //We will check for that users id and also check if the ID mathes with the one we get on the session
  //If they actually match, we go ahead and delete the account, and then destroy the session
  const { userId: senderId } = req.user.id;
  const { id: receiverId } = req.params.id;
  const reqSender = await User.findById(senderId).select("-password");
  const reqReceiver = await User.findById(receiverId).select("-password");
  //We will check if the personsId already exist in your friendRequestGotten list;
  //We will check if the personsId already exist on your friendReceived List;
  //We will check if the personsId exist on your friend List;
  if (reqSender.friendRequestGotten.includes(receiverId)) {
    return next(
      new AppError("This user had already sent you a friend request", 400)
    );
  }
  if (reqSender.friendRequestSent.includes(receiverId)) {
    return next(
      new AppError("You had already sent this user a friend request", 400)
    );
  }
  if (reqSender.friends.includes(receiverId)) {
    return next(
      new AppError("Failed because this user is already your friend", 400)
    );
  }
  if (reqReceiver.friends.includes(senderId)) {
    return next(
      new AppError("Failed because you are already this users friend", 400)
    );
  }
  if (reqReceiver.friendRequestSent.includes(senderId)) {
    return next(
      new AppError("This user had already sent you a friend request", 400)
    );
  }
  if (reqReceiver.friendRequestGotten.includes(senderId)) {
    return next(
      new AppError(
        "This user had already received a friend request from you.",
        400
      )
    );
  }
  await reqSender.friendRequestSent.push(receiverId);
  await reqReceiver.friendRequestGotten.push(senderId);
  await Promise.all([reqSender.save(), reqReceiver.save()]);

  return res.status(202).json({
    status: "ok",
    success: "sent",
    message: "Friend request has been sent succesfully",
  });
});

module.exports.AcceptFriendRequest = catchAsync(async (req, res, next) => {
  const { userId: senderId } = req.user.id;
  const { id: receiverId } = req.params.id;

  const reqSender = await User.findById(senderId).select("-password");
  const reqReceiver = await User.findById(receiverId).select("-password");
  //We will check if the personsId exist on your friend List;
  if (reqSender.friends.includes(receiverId)) {
    return next(
      new AppError("Failed because this user is already your friend", 400)
    );
  }
  if (reqReceiver.friends.includes(senderId)) {
    return next(
      new AppError("Failed because you are already this users friend", 400)
    );
  };
  await reqSender.friendRequestSent.pull(receiverId);
  await reqReceiver.friendRequestGotten.pull(senderId);
  await reqSender.friends.push(receiverId);
  await reqReceiver.friends.push(senderId);
  await Promise.all([reqSender.save(), reqReceiver.save()]);
  return res.status(202).json({
    status: "ok",
    success: "added",
    message: "Friend added succesfully",
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
 