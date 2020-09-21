"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.CourseSchema = new mongoose.Schema({
    courseFolder: String,
    courseLectures: [
        {
            accessDate: String,
            additionalMaterials: [
                {
                    materialTitle: String,
                    materialLink: String,
                }
            ],
            lectureTime: Number,
            lectureTitle: String,
        }
    ],
    courseName: String,
    courseTime: Number,
    numOfLectures: Number,
});
//# sourceMappingURL=course.schema.js.map