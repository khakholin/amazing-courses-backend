"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.CourseSchema = new mongoose.Schema({
    lectures: [
        {
            available: Boolean,
            checked: Boolean,
            title: String,
            time: Number,
        }
    ],
    numOfLectures: Number,
    time: Number,
    title: String,
});
//# sourceMappingURL=course.schema.js.map