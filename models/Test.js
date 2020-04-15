const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
    testName: {
        type: String,
        trim: true,
        required: [true, "Please add some text"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Test", TestSchema);
