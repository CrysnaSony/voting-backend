var QuestionModel = require("../models/questionModel.js");
module.exports = {
  /**
   * questionController.list()
   */
  list: function (req, res) {
    QuestionModel.find(function (err, questions) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting question.",
          error: err,
        });
      }

      return res.json(questions);
    });
  },

  /**
   * questionController.show()
   */
  show: async function (id) {
    // var id = req.params.qId;

    const question = await QuestionModel.findOne({ _id: id });
    return question;
  },

  /**
   * questionController.create()
   */
  create: function (req, res) {
    var question = new QuestionModel({
      question: req.body.question,
      options: req.body.options,
    });

    question.save(function (err, question) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating question",
          error: err,
        });
      }

      return res.status(201).json(question);
    });
  },

  /**
   * questionController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    QuestionModel.findOne({ _id: id }, function (err, que) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting question",
          error: err,
        });
      }

      if (!que) {
        return res.status(404).json({
          message: "No such question",
        });
      }

      que.question = req.body.question ? req.body.question : que.question;
      que.options = req.body.options ? req.body.options : que.options;

      que.save(function (err, question) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating question.",
            error: err,
          });
        }

        return res.json(que);
      });
    });
  },

  /**
   * questionController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    QuestionModel.findByIdAndRemove(id, function (err, question) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the question.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
