const { GetAllUsers } = require("../controllers/user.controller");

const router = require("express").Router();

router.get('/all-users', GetAllUsers)

module.exports = router