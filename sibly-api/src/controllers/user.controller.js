//For updating pictures and stuff
//For deleting account

const AppError = require("../errors/AppError");
const catchAsync = require("../errors/catchAsync");

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


    req.session.destroy((err)=>{
      if(err){
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
    // let { name, email, username, password } = req.body;
    //We will check for that users id and also check if the ID mathes with the one we get on the session
    //If they actually match, we go ahead and delete the account, and then destroy the session
   
  
    return res.status(202).json({
      status: "ok",
      success: "fetched",
      message: "Users fetched succesfully",
   
    });
  });