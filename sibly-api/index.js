const express = require("express")
const cors = require("cors");
require("dotenv").config();
const session = require('express-session');
const helmet = require("helmet");


const app = express()

app.use(cors());
app.use(helmet());
app.use(express.json());
const port = process.env.PORT || 7070
app.listen(port, ()=>{console.log("Server runing")})