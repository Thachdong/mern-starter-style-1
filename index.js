require("dotenv").config();
require("./middlewares/passport");
const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");

//Connect to mongodb via mongoose
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongodb connected"));
//Top middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routes
app.use("/user", userRoutes);
//Error handler
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    data: null,
  });
});
//Server listen
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
