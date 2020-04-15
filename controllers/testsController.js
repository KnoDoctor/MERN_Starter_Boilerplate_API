const Test = require("../models/Test");
const axios = require("axios");

// @desc    Get all Tests
// @route   GET /api/v1/tests
// @access  Public
exports.getTests = async (req, res, next) => {
    try {
        const tests = await Test.find();

        return res.status(200).json({
            success: true,
            count: tests.length,
            data: tests,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc    Add a Test
// @route   POST /api/v1/tests
// @access  Public
exports.addTest = async (req, res, next) => {
    try {
        const test = await Test.create(req.body);

        return res.status(201).json({
            sucess: true,
            data: test,
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(
                (val) => val.message
            );

            return res.status(400).json({
                success: false,
                error: messages,
            });
        } else {
            return res.status(500).json({
                success: false,
                error: "Server Error",
            });
        }
    }
};

// @desc    Delete a Tests
// @route   DELETE /api/v1/tests/:id
// @access  Public
exports.deleteTest = async (req, res, next) => {
    try {
        const test = await Test.findById(req.params.id);

        if (!test) {
            return res.status(404).json({
                success: false,
                error: "No test found",
            });
        }

        await test.remove();

        return res.status(200).json({
            success: true,
            message: `Test with the id <${test.id}> has been deleted`,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc    Get Reddit Data
// @route   GET /api/v1/tests/reddit
// @access  Public
exports.getRedditData = async (req, res, next) => {
    axios
        .get("https://www.reddit.com/r/videos.json")
        .then((response) => {
            const tests = response;

            return res.status(200).json({
                success: true,
                count: tests.data.data.dist,
                posts: tests.data.data.children,
            });
        })
        .catch((error) => {
            console.log(error);
        });
};
