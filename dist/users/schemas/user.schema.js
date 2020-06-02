"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    availableCourses: [String],
    courseProgress: [
        {
            courseName: String,
            numAvailableLectures: Number,
            numCheckedLectures: Number,
        }
    ],
    email: String,
    password: String,
    realName: String,
    realSurname: String,
    role: String,
    school: String,
    university: String,
    username: String,
    workPlace: String,
});
//# sourceMappingURL=user.schema.js.map