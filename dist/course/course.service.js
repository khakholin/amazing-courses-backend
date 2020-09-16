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
const arrayMove = require("array-move");
const users_types_1 = require("../users/users.types");
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
    async getTestingProgress(data) {
        const user = await this.userModel.findOne({ email: data.email });
        if (user) {
            let soughtProgress;
            user.courseProgress.map(item => {
                if (item.courseName === data.courseName) {
                    soughtProgress = item.lecturesTesting.find(lec => lec.lectureTitle === data.lectureTitle);
                }
            });
            if (soughtProgress) {
                return soughtProgress;
            }
            else {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'COURSE_PROGRESS_NOT_FOUND',
                }, common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllCourses() {
        const courses = await this.courseModel.find();
        return courses.map((item) => item.courseName);
    }
    async getCoursesData() {
        return await this.courseModel.find();
    }
    async getUserAvailableCourses(data) {
        const user = await this.userModel.findOne({ email: data.email });
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
        const user = await this.userModel.findOne({ email: data.email });
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
                courseName: newCourse.courseName,
                numOfLectures: newCourse.numOfLectures,
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
    async addLectures(data) {
        var _a, _b;
        const course = await this.courseModel.findOne({ courseName: data.courseName });
        const courseTesting = await this.testingModel.findOne({ courseName: data.courseName });
        if (course) {
            course.courseLectures = (_a = course.courseLectures) === null || _a === void 0 ? void 0 : _a.concat(data.courseLectures);
            course.numOfLectures = (+(course.numOfLectures) + +(data.courseLectures.length)).toString();
            let newLecturesTime = 0;
            (_b = data.courseLectures) === null || _b === void 0 ? void 0 : _b.map(item => newLecturesTime += +(item.lectureTime));
            course.courseTime = (+(course.courseTime) + newLecturesTime);
            await course.save();
            courseTesting.courseTests = courseTesting === null || courseTesting === void 0 ? void 0 : courseTesting.courseTests.concat(data.courseLectures.map(item => ({ lectureTitle: item.lectureTitle, lectureQuestions: [] })));
            courseTesting.numOfLectures = (+(course.numOfLectures) + +(data.courseLectures.length)).toString();
            await courseTesting.save();
            return course;
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'COURSE_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async moveLectures(data) {
        const course = await this.courseModel.findOne({ courseName: data.courseName });
        const courseTesting = await this.testingModel.findOne({ courseName: data.courseName });
        if (course) {
            course.courseLectures = arrayMove(course.courseLectures, data.oldIndex, data.newIndex);
            await course.save();
            courseTesting.courseTests = arrayMove(courseTesting.courseTests, data.oldIndex, data.newIndex);
            await courseTesting.save();
            return course;
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'COURSE_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async removeCourse(data) {
        const course = await this.courseModel.findOne({ courseName: data.courseName });
        if (course) {
            await this.courseModel.deleteOne({ courseName: data.courseName });
            const courseTesting = await this.testingModel.findOne({ courseName: data.courseName });
            if (courseTesting) {
                await this.testingModel.deleteOne({ courseName: data.courseName });
                const users = await this.userModel.find();
                users.forEach(async (user) => {
                    var _a, _b;
                    user.availableCourses = (_a = user.availableCourses) === null || _a === void 0 ? void 0 : _a.filter(course => course !== data.courseName);
                    user.courseProgress = (_b = user.courseProgress) === null || _b === void 0 ? void 0 : _b.filter(course => course.courseName !== data.courseName);
                    await user.save();
                });
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.OK,
                    message: 'COURSE_AND_TEST_SUCCESSFULLY_REMOVED',
                }, common_1.HttpStatus.OK);
            }
            else {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.OK,
                    message: 'COURSE_SUCCESSFULLY_REMOVED',
                }, common_1.HttpStatus.OK);
            }
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'COURSE_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async removeCourseLecture(data) {
        let isRemovedData = 0;
        const course = await this.courseModel.findOne({ courseName: data.courseName });
        if (course) {
            const filteredLectures = course.courseLectures.filter(lecture => lecture.lectureTitle !== data.lectureTitle);
            const deletedLecture = course.courseLectures.find(lecture => lecture.lectureTitle === data.lectureTitle);
            course.courseTime = (+(course.courseTime) - +(deletedLecture.lectureTime));
            course.numOfLectures = (+(course.numOfLectures) - 1).toString();
            course.courseLectures = filteredLectures;
            isRemovedData++;
            await course.save();
        }
        const testing = await this.testingModel.findOne({ courseName: data.courseName });
        if (testing) {
            const filteredTests = testing.courseTests.filter(lecture => lecture.lectureTitle !== data.lectureTitle);
            testing.numOfLectures = (+(testing.numOfLectures) - 1).toString();
            testing.courseTests = filteredTests;
            isRemovedData++;
            await testing.save();
        }
        const users = await this.userModel.find();
        users.forEach(async (user) => {
            var _a;
            const selectedCourse = (_a = user.courseProgress) === null || _a === void 0 ? void 0 : _a.find(course => course.courseName === data.courseName);
            if (selectedCourse) {
                selectedCourse.lecturesTesting = selectedCourse.lecturesTesting.filter(testing => testing.lectureTitle !== data.lectureTitle);
                isRemovedData++;
            }
            await user.save();
        });
        if (isRemovedData) {
            return await this.courseModel.find();
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'LECTURE_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async changeUserAvailableCourses(data) {
        const user = await this.userModel.findOne({ email: data.email });
        let index = -1;
        if (user) {
            user.availableCourses.find((course, i) => {
                course === data.courseName ? index = i : index = index;
            });
            if (index !== -1) {
                user.availableCourses.splice(index, 1);
                user.courseProgress.map(progress => {
                    if (progress.courseName === data.courseName) {
                        progress.availableLectures = [];
                        progress.checkedLectures = [];
                    }
                });
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
        const user = await this.userModel.findOne({ email: data.email });
        let courseIndex = -1;
        if (user) {
            user.courseProgress.find((item, i) => {
                item.courseName === data.courseName ? courseIndex = i : courseIndex = courseIndex;
            });
            if (courseIndex !== -1) {
                let lectureIndex = -1;
                user.courseProgress[courseIndex].availableLectures.find((lecture, j) => {
                    lecture === data.lectureTitle ? lectureIndex = j : lectureIndex;
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
                    user.courseProgress[courseIndex].availableLectures.push(data.lectureTitle);
                    await user.save();
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.OK,
                        message: 'LECTURE_SUCCESSFULLY_SET_AVAILABLE',
                    }, common_1.HttpStatus.OK);
                }
            }
            else {
                user.courseProgress.push({ courseName: data.courseName, availableLectures: [data.lectureTitle], checkedLectures: [] });
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
        const user = await this.userModel.findOne({ email: data.email });
        let courseIndex = -1;
        if (user) {
            user.courseProgress.find((item, i) => {
                item.courseName === data.courseName ? courseIndex = i : courseIndex = courseIndex;
            });
            if (courseIndex !== -1) {
                let lectureIndex = -1;
                user.courseProgress[courseIndex].checkedLectures.find((lecture, j) => {
                    lecture === data.lectureTitle ? lectureIndex = j : lectureIndex;
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
                    user.courseProgress[courseIndex].checkedLectures.push(data.lectureTitle);
                    await user.save();
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.OK,
                        message: 'LECTURE_SUCCESSFULLY_SET_CHECKED',
                    }, common_1.HttpStatus.OK);
                }
            }
            else {
                user.courseProgress.push({ courseName: data.courseName, checkedLectures: [data.lectureTitle], availableLectures: [] });
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