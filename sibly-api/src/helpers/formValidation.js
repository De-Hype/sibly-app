const Joi = require('joi');

const validator =(schema)=>(payload)=> schema.validate(payload, {abortEarly:false});


const SignUpSchema = Joi.object({
    name:Joi.string().min(4).required().label("Name"),
    username:Joi.string().min(7).required().label("Username"),
    email:Joi.string().email().required().label("Email"),
    password:Joi.string().min(6).max(30).required().label("Password"),
})

const SignInSchema = Joi.object({
    email:Joi.string().email().required().label("Email"),
    password:Joi.string().min(6).max(30).required().label("Password"),
})



exports.ValidateSignUp= validator(SignUpSchema);
exports.ValidateSignIn = validator(SignInSchema);