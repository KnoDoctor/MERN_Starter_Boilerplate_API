const express = require("express");

const router = express.Router();

const {
    getTests,
    getRedditData,
    addTest,
    deleteTest,
} = require("../controllers/testsController");

router.route("/").get(getTests).post(addTest);
router.route("/reddit").get(getRedditData);
router.route("/:id").delete(deleteTest);

module.exports = router;
