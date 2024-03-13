const router = require("express").Router();
// const passport = require("passport");
const { SignUp, LogOut, SignIn } = require("../controllers/auth.controller");
const Limiter = require("../middleware/rateLimit");

router.post('/register', Limiter, SignUp );
router.patch('/sign-in', Limiter, SignIn);
router.get('/sign-out', LogOut);



module.exports = router;
