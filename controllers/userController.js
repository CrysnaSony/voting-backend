var UserModel = require("../models/userModel.js");

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {
  /**
   * userController.list()
   */
  list: function (req, res) {
    UserModel.find(function (err, users) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user.",
          error: err,
        });
      }

      return res.json(users);
    });
  },

  /**
   * userController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    UserModel.findOne({ _id: id }, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user.",
          error: err,
        });
      }

      if (!user) {
        return res.status(404).json({
          message: "No such user",
        });
      }

      return res.json(user);
    });
  },

  findById: async function (id) {
    const user = await UserModel.findOne({ _id: id });
    return user;
  },
  /**
   * userController.create()
   */
  create: function (req, res) {
    var user = new UserModel({
      id: req.body.id,
      name: req.body.name,
      freeLimit: req.body.freeLimit,
    });

    user.save(function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating user",
          error: err,
        });
      }

      return res.status(201).json(user);
    });
  },

  /**
   * userController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    UserModel.findOne({ _id: id }, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user",
          error: err,
        });
      }

      if (!user) {
        return res.status(404).json({
          message: "No such user",
        });
      }

      user.id = req.body.id ? req.body.id : user.id;
      user.name = req.body.name ? req.body.name : user.name;
      user.freeLimit = req.body.freeLimit ? req.body.freeLimit : user.freeLimit;

      user.save(function (err, user) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating user.",
            error: err,
          });
        }

        return res.json(user);
      });
    });
  },

  updateFreeLimit: async function (_id, stars) {
    return await UserModel.updateOne(
      { _id },
      {
        $inc: {
          freeLimit: -stars,
        },
      }
    );
  },

  /**
   * userController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    UserModel.findByIdAndRemove(id, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the user.",
          error: err,
        });
      }

      return res.status(200).send({ message: "User Deleted Successfully" });
    });
  },
};
