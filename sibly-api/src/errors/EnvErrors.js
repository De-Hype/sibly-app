const sendDevError = (err, res) => {
    
    res.status(err.statusCode).json({
      status: err.status,
      message:err.message,
      err:err,
      
    });
  };

  const sendProdError = (err, res) => {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Something went wrong.",
      });
    }
  };
  
  module.exports = {sendDevError, sendProdError}