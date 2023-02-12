var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [
        {
          option: {
            type: String,
            required: true,
          },
        },
      ],
      validate: [arrayLimit, "{PATH} cannot be more than 4"],
    },
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length <= 4;
}
module.exports = mongoose.model("questions", questionSchema);
