const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController.js");

/*
 * GET
 */
router.get("/question/", questionController.list);

/*
 * GET
 */
router.get("/question/:id", questionController.show);

/*
 * POST
 */
router.post("/question/", questionController.create);

/*
 * PUT
 */
router.put("/question/:id", questionController.update);

/*
 * DELETE
 */
router.delete("/question/:id", questionController.remove);

module.exports = router;
