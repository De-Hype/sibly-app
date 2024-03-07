const express = require("express")
const cors = require("cors");
require("dotenv").config();
const session = require('express-session');
const helmet = require("helmet");
const morgan = require("morgan");
const Connect = require("./src/config/db");
const GlobalErrorHandler = require("./src/errors/errorHandler");


const app = express()


process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("Unhandled Exception, shutting down");
    process.exit(1);
  });
  

app.use(cors());
app.use(helmet());
app.use(morgan("dev"))
app.use(express.json());
app.use(session({
    secret:process.env.SESSION_SECRET,
    saveUnintialized:true,
    resave:true,
    cookie:{
        httpOnly:true,
        maxAge: parseInt( process.env.SESSION_MAX_AGE)
    }
}))


app.all("*", (req, res, next) => {

    next(
      new AppError(
        `Can not find ${req.originalUrl} with ${req.method} on this server`,
        501
      )
    );
  });
  app.use(GlobalErrorHandler);
  


const port = process.env.PORT || 7070

Connect().then(()=>{
    app.listen(port, ()=>{console.log(`Server runing on ${port}`)})
})

process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("Unhandled Rejection, shutting down");
    server.close(() => {
      process.exit(1);
    });
  });