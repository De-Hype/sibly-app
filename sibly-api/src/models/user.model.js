const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    lastActive:{
        type:Date,
        required:true,
        default:Date.now
    }, 
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    profilePic:{
        type:String,
        default:null
    }
}, {timestamps:true})

const User = mongoose.model("user", userSchema);
module.exports = User