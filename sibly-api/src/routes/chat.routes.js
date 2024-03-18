const { SendMessage, GetMessage } = require("../controllers/chat.controller");
const VerifyToken = require("../middleware/VerifyToken");

const router = require("express").Router();

router.post("/send-message/:id", VerifyToken, SendMessage);
router.get("/get-message/:id", VerifyToken, GetMessage);

module.exports = router;
