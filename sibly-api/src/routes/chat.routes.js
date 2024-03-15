const { SendMessage, GetMessage } = require("../controllers/chat.controller");

const router = require("express").Router();

router.post("/send-message/:id", SendMessage);
router.get("/get-message/:id", GetMessage);

module.exports = router;
