const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const questionController = require("../controllers/questionController.js");
const voteTransactionModel = require("../models/vote-transactionModel.js");
const cache = require("../routeCache.js");
const mongoose = require("mongoose");

//Give Vote
router.post("/votes/:qId/user/:id", async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send("User ID is required");
    if (!req.params.qId) return res.status(400).send("Question ID is required");
    const userId = req.params.id;
    const questionId = req.params.qId;
    const user = await userController.findById(userId);
    if (!user) return res.status(400).send("Error finding User");
    const question = await questionController.show(questionId);
    if (!question) return res.status(400).send("Error finding question");
    let sumofStars = 0;
    const options = req.body.map((val) => {
      let op = question.options.find((o) => o.option == val.option);
      if (!op) throw "Option is invalid";
      if (val.stars % 50 != 0 || val.stars <= 0)
        throw "Stars must be in multiple of 50";
      let option = { ...op };
      option.stars = val.stars;
      sumofStars += option.stars;
      return option;
    });

    if (user.freeLimit - sumofStars < 0)
      return res.status(400).send("Exceeded Free Limit");

    const voteTransaction = new voteTransactionModel({
      userId,
      questionId,
      options,
    });
    await userController.updateFreeLimit(userId, sumofStars);
    voteTransaction.save(function (err) {
      if (err) {
        return res.status(500).json({
          message: "Error while vote Transaction",
          error: err,
        });
      }
    });
    return res.status(200).json({
      message: "Vote Submitted Successfully",
      freeStarLimitRemaining: user.freeLimit - sumofStars,
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});

//Details of Vote
router.get("/votes/:qId", cache(3), async (req, res) => {
  try {
    const questionId = req.params.qId;
    if (!questionId) return res.status(400).send("Question Id is required");
    const question = await questionController.show(questionId);
    if (!question) return res.status(400).send("Error finding question");
    const result = await voteTransactionModel
      .aggregate([
        [
          {
            $match: {
              questionId: mongoose.mongo.ObjectId(questionId),
            },
          },
          {
            $unwind: {
              path: "$options",
            },
          },
          {
            $group: {
              _id: {
                id: "$options._id",
                optionValue: "$options.option",
              },
              totalStars: {
                $sum: "$options.stars",
              },
            },
          },
        ],
      ])
      .exec();

    const options = question.options
      .map((val, index, arr) => {
        const res = result.find((r) => r._id.id.equals(val._id));
        const out = { ...val.toObject() };
        out.totalStars = res ? res.totalStars : 0;
        const allStars = result.reduce((sum, val) => sum + val.totalStars, 0);
        out.votePercentage = res
          ? Math.round((res.totalStars / allStars) * 100)
          : 0;
        return out;
      })
      .sort((a, b) => b.totalStars - a.totalStars)
      .map((val, index) => {
        return { ...val, rank: index + 1 };
      });

    const master = { ...question.toObject() };
    master.options = options;
    return res.send(master);
  } catch (err) {
    return res.status(400).send("Error getting vote details");
  }
});

module.exports = router;
