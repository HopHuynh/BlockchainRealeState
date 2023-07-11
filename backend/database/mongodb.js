const { default: mongoose } = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error connecting");
  });
const mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "mongodb connection error"));
module.exports = mongoDB;
