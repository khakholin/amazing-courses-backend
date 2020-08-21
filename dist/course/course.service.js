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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CourseService = class CourseService {
    constructor(courseModel, userModel, testingModel) {
        this.courseModel = courseModel;
        this.userModel = userModel;
        this.testingModel = testingModel;
    }
    async getUserCourses(data) {
        let userCourses = [];
        let totalNumOfLectures = 0;
        let totalTime = 0;
        if (data.availableCourses) {
            if (data.availableCourses.length > 1) {
                for (const course of data.availableCourses) {
                    const desiredCourse = await this.courseModel.findOne({ courseName: course });
                    if (desiredCourse) {
                        userCourses.push(desiredCourse);
                        totalNumOfLectures += desiredCourse['numOfLectures'];
                        totalTime += desiredCourse['courseTime'];
                    }
                }
            }
            else {
                const desiredCourse = await this.courseModel.findOne({ courseName: data.availableCourses[0] });
                if (desiredCourse) {
                    userCourses.push(desiredCourse);
                    totalNumOfLectures += desiredCourse['numOfLectures'];
                    totalTime += desiredCourse['courseTime'];
                }
            }
        }
        return { totalNumOfLectures, totalTime, courses: userCourses };
    }
    async getAllCourses() {
        const courses = await this.courseModel.find();
        return courses.map((item) => item.courseName);
    }
    async getCoursesData() {
        return await this.courseModel.find();
    }
    async getUserAvailableCourses(data) {
        const user = await this.userModel.findOne({ username: data.username });
        if (user) {
            return user.availableCourses;
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getUserCourseProgress(data) {
        const user = await this.userModel.findOne({ username: data.username });
        if (user) {
            return user.courseProgress;
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
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
            const createdCourseTesting = new this.testingModel({
                courseName: newCourse.courseName, numOfLectures: newCourse.numOfLectures,
                courseTests: newCourse.courseLectures.map(item => ({ lectureTitle: item.lectureTitle, lectureQuestions: [] })),
            });
            createdCourse.save();
            createdCourseTesting.save();
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CREATED,
                message: 'SUCCESS',
            }, common_1.HttpStatus.CREATED);
        }
    }
    async changeUserAvailableCourses(data) {
        const user = await this.userModel.findOne({ username: data.username });
        let index = -1;
        if (user) {
            user.availableCourses.find((course, i) => {
                course === data.courseName ? index = i : index = index;
            });
            if (index !== -1) {
                user.availableCourses.splice(index, 1);
                await user.save();
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.OK,
                    message: 'COURSE_SUCCESSFULLY_REMOVED',
                }, common_1.HttpStatus.OK);
            }
            else {
                user.availableCourses.push(data.courseName);
                await user.save();
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.OK,
                    message: 'COURSE_SUCCESSFULLY_ADDED',
                }, common_1.HttpStatus.OK);
            }
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async changeUserLectureAvailable(data) {
        const user = await this.userModel.findOne({ username: data.username });
        let courseIndex = -1;
        if (user) {
            user.courseProgress.find((item, i) => {
                item.courseName === data.courseName ? courseIndex = i : courseIndex = courseIndex;
            });
            if (courseIndex !== -1) {
                let lectureIndex = -1;
                user.courseProgress[courseIndex].availableLectures.find((lecture, j) => {
                    lecture === data.availableLecture ? lectureIndex = j : lectureIndex;
                });
                if (lectureIndex !== -1) {
                    user.courseProgress[courseIndex].availableLectures.splice(lectureIndex, 1);
                    await user.save();
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.OK,
                        message: 'LECTURE_SUCCESSFULLY_SET_UNAVAILABLE',
                    }, common_1.HttpStatus.OK);
                }
                else {
                    user.courseProgress[courseIndex].availableLectures.push(data.availableLecture);
                    await user.save();
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.OK,
                        message: 'LECTURE_SUCCESSFULLY_SET_AVAILABLE',
                    }, common_1.HttpStatus.OK);
                }
            }
            else {
                user.courseProgress.push({ courseName: data.courseName, availableLectures: [data.availableLecture], checkedLectures: [] });
                await user.save();
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.OK,
                    message: 'COURSE_PROGRESS_SUCCESSFULLY_ADDED',
                }, common_1.HttpStatus.OK);
            }
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async changeUserLectureChecked(data) {
        const user = await this.userModel.findOne({ username: data.username });
        let courseIndex = -1;
        if (user) {
            user.courseProgress.find((item, i) => {
                item.courseName === data.courseName ? courseIndex = i : courseIndex = courseIndex;
            });
            if (courseIndex !== -1) {
                let lectureIndex = -1;
                user.courseProgress[courseIndex].checkedLectures.find((lecture, j) => {
                    lecture === data.checkedLecture ? lectureIndex = j : lectureIndex;
                });
                if (lectureIndex !== -1) {
                    user.courseProgress[courseIndex].checkedLectures.splice(lectureIndex, 1);
                    await user.save();
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.OK,
                        message: 'LECTURE_SUCCESSFULLY_SET_UNCHECKED',
                    }, common_1.HttpStatus.OK);
                }
                else {
                    user.courseProgress[courseIndex].checkedLectures.push(data.checkedLecture);
                    await user.save();
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.OK,
                        message: 'LECTURE_SUCCESSFULLY_SET_CHECKED',
                    }, common_1.HttpStatus.OK);
                }
            }
            else {
                user.courseProgress.push({ courseName: data.courseName, checkedLectures: [data.checkedLecture], availableLectures: [] });
                await user.save();
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.OK,
                    message: 'COURSE_PROGRESS_SUCCESSFULLY_ADDED',
                }, common_1.HttpStatus.OK);
            }
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
CourseService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Course')),
    __param(1, mongoose_1.InjectModel('User')),
    __param(2, mongoose_1.InjectModel('Testing')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map