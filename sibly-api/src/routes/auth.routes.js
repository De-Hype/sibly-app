const router = require("express").Router();
// const passport = require("passport");
const { SignUp, LogOut, SignIn, CheckIfLoggedIn } = require("../controllers/auth.controller");
const VerifyToken = require("../middleware/VerifyToken");
const Limiter = require("../middleware/rateLimit");

router.post('/register', Limiter, SignUp );
router.patch('/sign-in', Limiter, SignIn);
router.get('/verify-login', VerifyToken, CheckIfLoggedIn);
router.get('/sign-out', VerifyToken, LogOut);



module.exports = router;
