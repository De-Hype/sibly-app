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
    },
    googleId:{
        type:String,
        unique:true,
        default:""
    },
    githubId:{
        type:String,
        unique:true,
        default:""
    }
    
}, {timestamps:true})

const User = mongoose.model("user", userSchema);
module.exports = User