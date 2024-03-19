const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.config.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoute");
const clientRoutes=require("./routes/arRoutes.js");

app.use("/user", userRoutes);
app.use("/client",clientRoutes);


mongoose.Promise = global.Promise;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};
mongoose
  .connect(dbConfig.url, options, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database.", err);
    process.exit();
  });

app.listen(2000, () => console.log(`Server Started on 2000`));
