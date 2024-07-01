const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const path = require("path");
const uploadRouter = require("./controllers/uploadRouter");
const validateRouter = require("./controllers/validateRouter");

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

app.use("/upload", uploadRouter);
app.use("/validate-files", validateRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
