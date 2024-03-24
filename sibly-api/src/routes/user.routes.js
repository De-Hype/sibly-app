const VerifyToken = require("../middleware/VerifyToken");
const {
  GetAllUsers,
  GetSingleUser,
  SearchFriends,
  SearchUsers,
  DeleteUser,
  UpdateUser,
  GetMyDetails,
  SendFriendRequest,
  AcceptFriendRequest,
  RemoveFriendRequest,
  FetchNonFriends,
} = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/all-users",  GetAllUsers);
router.get("/single-user", VerifyToken, GetSingleUser);
router.post("/my-details", VerifyToken, GetMyDetails);
router.delete("/delete-account/:id", VerifyToken, DeleteUser);
router.put("/update-user", VerifyToken, UpdateUser);
router.get("/search-friend/:id", VerifyToken, SearchFriends);
router.get("/search-users", VerifyToken, SearchUsers);
router.get("/fetch-non-friends", VerifyToken, FetchNonFriends )


module.exports = router;
