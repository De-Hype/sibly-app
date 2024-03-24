const { SendFriendRequest, AcceptFriendRequest, RemoveFriendRequest, FetchFriendRequestGotten } = require("../controllers/friendRequest.controller");
const VerifyToken = require("../middleware/VerifyToken");


const router = require("express").Router();

router.get("/get-received-request", VerifyToken, FetchFriendRequestGotten)
router.get("/send-friend-request/:id", VerifyToken, SendFriendRequest);
router.get("/accept-friend-request/:id", VerifyToken, AcceptFriendRequest);
router.delete("/remove-friend-request/:id", VerifyToken, RemoveFriendRequest)

module.exports = router;
