const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbname = "vote-db";
mongoose.set("strictQuery", true);

mongoose.connect(
  process.env.MONGO_URL + "/" + dbname,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Database connected");
  }
);
