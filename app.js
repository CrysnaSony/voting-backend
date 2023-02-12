const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRoutes");
const questionRouter = require("./routes/questionRoutes");
const voteTransactionRouter = require("./routes/voteTransactionRoutes");
app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(questionRouter);
app.use(voteTransactionRouter);
module.exports = app;
