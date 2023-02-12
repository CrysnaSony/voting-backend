var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var voteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "vote",
    },
    options: [
      {
        option: {
          type: String,
          required: true,
        },
        stars: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vote-transactions", voteSchema);
