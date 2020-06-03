"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const courses_data_1 = require("./data/courses.data");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CourseService = class CourseService {
    constructor(courseModel) {
        this.courseModel = courseModel;
        this.courses = courses_data_1.courseList;
    }
    getUserCourses(availableCourses) {
        let userCourses = [];
        let totalNumOfLectures = 0;
        let totalTime = 0;
        availableCourses.map((availableCourse) => {
            this.courses.map((course) => {
                if (availableCourse.title === course.title) {
                    userCourses.push(course);
                    totalNumOfLectures += course.numOfLectures;
                    totalTime += course.time;
                }
            });
        });
        return { totalNumOfLectures, totalTime, data: userCourses };
    }
    async getAllCourses() {
        const courses = await this.courseModel.find();
        return courses.map((item) => item.courseName);
    }
    async createCourse(newCourse) {
        if (await this.courseModel.findOne({ courseName: newCourse.courseName })) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'COURSE_DUPLICATE',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            const createdCourse = new this.courseModel(newCourse);
            createdCourse.save();
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CREATED,
                message: 'SUCCESS',
            }, common_1.HttpStatus.CREATED);
        }
    }
};
CourseService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Course')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map