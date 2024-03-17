const router = require("express").Router();
// const passport = require("passport");
const { SignUp, LogOut, SignIn, CheckIfLoggedIn } = require("../controllers/auth.controller");
const Limiter = require("../middleware/rateLimit");

router.post('/register', Limiter, SignUp );
router.patch('/sign-in', Limiter, SignIn);
router.get('/verify-login', CheckIfLoggedIn);
router.get('/sign-out', LogOut);



module.exports = router;
