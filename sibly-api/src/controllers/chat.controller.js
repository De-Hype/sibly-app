//Here, we will have the Searching of friends
//We will have the message sending part

const catchAsync = require("../errors/catchAsync");
const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

module.exports.SendMessage = catchAsync(async (req, res, next) => {
  const message = req.body.message;
  const { id: receiverId } = req.params;
  const senderId = req.session.user.id;

  let conversation = await Conversation.findOne({
    particapants: { $all: [senderId, receiverId] },
  });
  if (!conversation) {
    conversation = await Conversation.create({
      particapants: [senderId, receiverId],
    });
  }
  const newMessage = await new Message({
    senderId,
    receiverId,
    message,
  });
  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }
  await Promise.all([conversation.save(), newMessage.save()]);

  //SocketIo stuff is to go in here;

  return res.status(201).json({
    status: "ok",
    success: "sent",
    message: "New message has been sent succesfully",
    userMessage: newMessage,
  });
});

module.exports.GetMessage = catchAsync(async (req, res, next) => {
  const { id: userToChatId } = req.params;
  const senderId = req.session.user.id;

  const conversation = await Conversation.findOne({
    particapants: { $all: [senderId, userToChatId] },
  }).populate("messages");
  if (!conversation) return res.status(200).json([]);

  return res.status(200).json({
    status: "ok",
    success: "gotten",
    message: "Message has been gotten succesfully",
    info: conversation.messages,
  });
});
