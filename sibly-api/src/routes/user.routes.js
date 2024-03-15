const {
  GetAllUsers,
  GetSingleUser,
  SearchFriends,
  SearchUsers,
  AddFriend,
  DeleteUser,
  UpdateUser,
} = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/all-users", GetAllUsers);
router.get("/single-user/:id", GetSingleUser);
router.get("/search-friend/:id", SearchFriends);
router.get("/search-users", SearchUsers);
router.patch("/add-friend", AddFriend);
router.delete("/delete-account/:id", DeleteUser);
router.put("/update-user/:id", UpdateUser);

module.exports = router;
