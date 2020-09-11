"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    availableCourses: [String],
    courseProgress: [
        {
            courseName: String,
            availableLectures: [String],
            checkedLectures: [String],
            lecturesTesting: [
                {
                    lectureTitle: String,
                    answers: [
                        {
                            userAnswer: String,
                            rightAnswer: String,
                        }
                    ],
                    result: {
                        right: String,
                        total: String
                    },
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
    workPlace: String,
});
//# sourceMappingURL=user.schema.js.map