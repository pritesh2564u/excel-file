const express = require("express");
const router = express.Router();
const validateMiddleware = require("../middlewares/validateMiddleware");

router.post("/", validateMiddleware, (req, res) => {
  res.status(200).json({ message: res.locals.message });
});

module.exports = router;
