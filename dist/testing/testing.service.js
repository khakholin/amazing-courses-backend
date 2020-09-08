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
    async getCoursesTests() {
        return await this.testingModel.find();
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
    async getTestWatch(updatedTest) {
        const course = await this.testingModel.findOne({ courseName: updatedTest.courseName });
        if (course) {
            const lectureData = course.courseTests.find((item) => item.lectureTitle === updatedTest.lectureTitle);
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
                const lecture = course.courseTests.find((item) => item.lectureTitle === checkedTest.lectureTitle);
                lecture.lectureQuestions.map((item, index) => {
                    if (item.answer.toLowerCase() === checkedTest.lectureAnswers[index].toLowerCase()) {
                        numOfAnswers++;
                    }
                });
                const percent = numOfAnswers / lecture.lectureQuestions.length;
                user.courseProgress.map(item => {
                    if (item.courseName === checkedTest.courseName) {
                        const arr = item.lecturesTesting.slice();
                        arr.map((lec, index) => {
                            if (lec.lectureTitle === checkedTest.lectureTitle) {
                                item.lecturesTesting.splice(index, 1);
                            }
                        });
                        item.lecturesTesting.push({ lectureTitle: checkedTest.lectureTitle, answers: checkedTest.lectureAnswers, percent: percent.toString() });
                    }
                });
                await user.save();
                return percent.toString();
            }
            else {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'WRONG_USERNAME',
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