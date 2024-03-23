const { SendFriendRequest, AcceptFriendRequest, RemoveFriendRequest } = require("../controllers/friendRequest.controller");
const VerifyToken = require("../middleware/VerifyToken");


const router = require("express").Router();

router.patch("/send-friend-request/:id", VerifyToken, SendFriendRequest);
router.patch("/accept-friend-request/:id", VerifyToken, AcceptFriendRequest);
router.delete("/remove-friend-request/:id", VerifyToken, RemoveFriendRequest)


module.exports = router;
