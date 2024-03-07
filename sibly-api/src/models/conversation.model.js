const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    particapants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        default:""
    }]
}, {timestamps:true})

const Conversation = new mongoose.model("converstion", conversationSchema);

module.exports = Conversation