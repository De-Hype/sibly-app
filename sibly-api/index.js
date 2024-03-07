const express = require("express")
const cors = require("cors");
require("dotenv").config();
const session = require('express-session');
const helmet = require("helmet");
const Connect = require("./src/config/db");


const app = express()

app.use(cors());
app.use(helmet());
app.use(express.json());
const port = process.env.PORT || 7070

Connect().then(()=>{

    app.listen(port, ()=>{console.log("Server runing")})
})