//Here, we will have the Searching of friends
//We will have the message sending part

module.exports.SearchFriends = catchAsync(async (req, res, next) => {
    
    return res.status(202).json({
      status: "ok",
      success: "found",
      message: "Friend has been found succesfully",
   
    });
  });