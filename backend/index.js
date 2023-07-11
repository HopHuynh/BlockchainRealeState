const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// var sql = require("mssql");
const port = 5000;
app.use(morgan("common"));
dotenv.config();

require("./models/index.js");
const authorRoute = require("./routes/user");
require("./database/mongodb");
//process.env.MONGODB_URL
// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log("connect DB");
//   })
//   .catch(() => {
//     console.log("error");
//   });

app.use("", authorRoute);
app.get("/img/:id", function (req, res) {
  const file = __dirname + "/uploads/" + req.params.id;

  res.sendFile(__dirname + "/uploads/" + req.params.id);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("seller_click_request_buy", () => {
    io.emit("admin_refresh_notify");
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});