const { GetAllUsers, GetSingleUser } = require("../controllers/user.controller");

const router = require("express").Router();

router.get('/all-users', GetAllUsers);
router.get('/single-user/:id', GetSingleUser)

module.exports = router