"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    availableCourses: [
        {
            title: String,
            numAvailableLectures: Number,
            numCheckedLectures: Number,
        }
    ],
    email: String,
    password: String,
    role: String,
    username: String,
});
//# sourceMappingURL=user.schema.js.map