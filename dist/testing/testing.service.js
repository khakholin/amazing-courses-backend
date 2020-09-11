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
let TestingService = class TestingService {
    constructor(courseModel, userModel, testingModel) {
        this.courseModel = courseModel;
        this.userModel = userModel;
        this.testingModel = testingModel;
    }
    async getAllTests() {
        const tests = await this.testingModel.find();
        return tests;
    }
    async updateTest(updatedTest) {
        const course = await this.testingModel.findOne({ courseName: updatedTest.courseName });
        if (course) {
            const mappedCourseTests = course.courseTests.map(item => {
                if (item.lectureTitle === updatedTest.lectureTitle) {
                    return { lectureTitle: updatedTest.lectureTitle, lectureQuestions: updatedTest.lectureQuestions };
                }
                else {
                    return item;
                }
            });
            course.courseTests = mappedCourseTests;
            await course.save();
            const users = await this.userModel.find();
            users.forEach(async (user) => {
                var _a;
                const selectedCourse = (_a = user.courseProgress) === null || _a === void 0 ? void 0 : _a.find(course => course.courseName === updatedTest.courseName);
                if (selectedCourse) {
                    selectedCourse.lecturesTesting = selectedCourse.lecturesTesting.filter(testing => testing.lectureTitle !== updatedTest.lectureTitle);
                }
                await user.save();
            });
            throw new common_1.HttpException({
                status: common_1.HttpStatus.OK,
                message: 'COURSE_TESTING_SUCCESSFULLY_UPDATED',
            }, common_1.HttpStatus.OK);
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'WRONG_COURSE_NAME',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async getTestWatch(test) {
        const course = await this.testingModel.findOne({ courseName: test.courseName });
        if (course) {
            const lectureData = course.courseTests.find((item) => item.lectureTitle === test.lectureTitle);
            return lectureData.lectureQuestions.map(item => {
                const transformedQuestion = item;
                transformedQuestion.answer = undefined;
                return transformedQuestion;
            });
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'WRONG_COURSE_NAME',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async getAvailableLecturesTests(test) {
        const course = await this.testingModel.findOne(test);
        if (course) {
            return { courseTests: course.courseTests };
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'COURSE_NOT_FOUND',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async getTestEdit(updatedTest) {
        const course = await this.testingModel.findOne({ courseName: updatedTest.courseName });
        if (course) {
            const lectureData = course.courseTests.find((item) => item.lectureTitle === updatedTest.lectureTitle);
            return lectureData.lectureQuestions;
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'WRONG_COURSE_NAME',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async checkTest(checkedTest) {
        const course = await this.testingModel.findOne({ courseName: checkedTest.courseName });
        const user = await this.userModel.findOne({ email: checkedTest.email });
        if (course) {
            if (user) {
                let numOfAnswers = 0;
                let modifiedAnswers = [];
                const lecture = course.courseTests.find((item) => item.lectureTitle === checkedTest.lectureTitle);
                lecture.lectureQuestions.map((item, index) => {
                    modifiedAnswers.push({ userAnswer: checkedTest.lectureAnswers[index].toLowerCase(), rightAnswer: item.answer.toLowerCase() });
                    if (item.answer.toLowerCase() === checkedTest.lectureAnswers[index].toLowerCase()) {
                        numOfAnswers++;
                    }
                });
                const result = { right: numOfAnswers, total: lecture.lectureQuestions.length };
                user.courseProgress.map(item => {
                    if (item.courseName === checkedTest.courseName) {
                        const arr = item.lecturesTesting.slice();
                        arr.map((lec, index) => {
                            if (lec.lectureTitle === checkedTest.lectureTitle) {
                                item.lecturesTesting.splice(index, 1);
                            }
                        });
                        item.lecturesTesting.push({ lectureTitle: checkedTest.lectureTitle, answers: modifiedAnswers, result });
                    }
                });
                await user.save();
                return { result };
            }
            else {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'WRONG_USER',
                }, common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'WRONG_COURSE_NAME',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
};
TestingService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Course')),
    __param(1, mongoose_1.InjectModel('User')),
    __param(2, mongoose_1.InjectModel('Testing')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TestingService);
exports.TestingService = TestingService;
//# sourceMappingURL=testing.service.js.map