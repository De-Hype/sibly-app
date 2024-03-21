const VerifyToken = require("../middleware/VerifyToken");
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

const router = require("express").Router();

router.get("/all-users",  GetAllUsers);
router.get("/single-user/:id", VerifyToken, GetSingleUser);
router.post("/my-details", VerifyToken, GetMyDetails);
router.get("/search-friend/:id", VerifyToken, SearchFriends);
router.get("/search-users", VerifyToken, SearchUsers);
router.patch("/add-friend", VerifyToken, AddFriend);
router.delete("/delete-account/:id", VerifyToken, DeleteUser);
router.put("/update-user", VerifyToken, UpdateUser);

module.exports = router;
