const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");

router.post("/", upload.single("file"), (req, res) => {
  res.send("File uploaded successfully");
});

module.exports = router;
