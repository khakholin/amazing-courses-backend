"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    availableCourses: [String],
    courseProgress: [
        {
            courseName: String,
            availableLectures: [Number],
            checkedLectures: [Number],
            lecturesTesting: [
                {
                    lectureTitle: String,
                    answers: [String],
                    percent: String,
                }
            ]
        }
    ],
    mentors: [String],
    email: String,
    password: String,
    realName: String,
    realSurname: String,
    roles: [String],
    school: String,
    university: String,
    username: String,
    workPlace: String,
});
//# sourceMappingURL=user.schema.js.map