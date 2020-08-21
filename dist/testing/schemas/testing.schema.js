"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.TestingSchema = new mongoose.Schema({
    courseName: String,
    numOfLectures: Number,
    courseTests: [
        {
            lectureTitle: String,
            lectureQuestions: [
                {
                    question: String,
                    answerOptions: [String],
                    answer: String,
                }
            ],
        },
    ],
});
//# sourceMappingURL=testing.schema.js.map