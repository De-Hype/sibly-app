const { SearchFriends } = require("../controllers/chat.controller");

const router = require("express").Router();

router.patch("/search-friend", SearchFriends );

module.exports = router