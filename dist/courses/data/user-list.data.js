"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const courses = require("./courses.data");
const userList = [
    { user: 'admin', password: 'admin', courses: [courses.cookingCourse, courses.reactCourse] },
    { user: 'Alexander', password: '1234567890', courses: [courses.reactCourse] },
    { user: 'Timur', password: '0987654321', courses: [courses.cookingCourse] },
];
exports.default = userList;
//# sourceMappingURL=user-list.data.js.map