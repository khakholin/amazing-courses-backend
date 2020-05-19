"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    availableCourses: Array,
    email: String,
    username: String,
    password: String,
});
//# sourceMappingURL=user.schema.js.map