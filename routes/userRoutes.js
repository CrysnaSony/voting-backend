const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

/*
 * GET
 */
router.get("/user/", userController.list);

/*
 * GET
 */
router.get("/user/:id", userController.show);

/*
 * POST
 */
router.post("/user/", userController.create);

/*
 * PUT
 */
router.put("/user/:id", userController.update);

/*
 * DELETE
 */
router.delete("/user/:id", userController.remove);

module.exports = router;
