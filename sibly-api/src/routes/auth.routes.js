const router = require("express").Router();
// const passport = require("passport");
const { SignUp, LogOut, SignIn, CheckIfLoggedIn, GoogleRedirect } = require("../controllers/auth.controller");
const VerifyToken = require("../middleware/VerifyToken");
const Limiter = require("../middleware/rateLimit");
const passport = require('passport');

router.post('/register', Limiter, SignUp );
router.patch('/sign-in', Limiter, SignIn);
router.get('/verify-login', VerifyToken, CheckIfLoggedIn);
router.get('/sign-out', VerifyToken, LogOut);
router.get("/google",passport.authenticate("google",{
    scope:['profile']
}) )
router.get("/google/redirect", passport.authenticate("google"), GoogleRedirect)



module.exports = router;
