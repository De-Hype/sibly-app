const {
  GetAllUsers,
  GetSingleUser,
  SearchFriends,
  SearchUsers,
  AddFriend,
  DeleteUser,
  UpdateUser,
  GetMyDetails,
} = require("../controllers/user.controller");
const VerifyToken = require("../middleware/VerifyToken");

const router = require("express").Router();

router.get("/all-users", VerifyToken, GetAllUsers);
router.get("/single-user/:id", VerifyToken, GetSingleUser);
router.get("/my-details", VerifyToken, GetMyDetails);
router.get("/search-friend/:id", VerifyToken, SearchFriends);
router.get("/search-users", VerifyToken, SearchUsers);
router.patch("/add-friend", VerifyToken, AddFriend);
router.delete("/delete-account/:id", VerifyToken, DeleteUser);
router.put("/update-user/:id", VerifyToken, UpdateUser);

module.exports = router;
