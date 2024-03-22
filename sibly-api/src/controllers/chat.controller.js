//Here, we will have the Searching of friends
//We will have the message sending part

const catchAsync = require("../errors/catchAsync");
const encryptMessage = require("../helpers/messageEncryption");
const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { getReceiverSocketId, io } = require("../socket/server");



module.exports.SendMessage = catchAsync(async (req, res, next) => {
  const message = req.body.message;
  const { id: receiverId } = req.params;
  const senderId = req.session.user.id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }
 const encryptedMessage = encryptMessage(message)
  const newMessage = await new Message({
    senderId,
    receiverId,
    message:encryptedMessage,
  });
  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }
  await Promise.all([conversation.save(), newMessage.save()]);

  //SocketIo stuff is to go in here;
  const receiverSocketId = getReceiverSocketId(receiverId);
  if(receiverSocketId){
    io.to(receiverId).emit("newMessage", newMessage);
  }
  

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
