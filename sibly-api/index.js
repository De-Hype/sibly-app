const express = require("express")
const cors = require("cors");
require("dotenv").config();
const session = require('express-session');
const helmet = require("helmet");
const morgan = require("morgan");
const Connect = require("./src/config/db");


const app = express()

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


const port = process.env.PORT || 7070

Connect().then(()=>{
    app.listen(port, ()=>{console.log(`Server runing on ${port}`)})
})