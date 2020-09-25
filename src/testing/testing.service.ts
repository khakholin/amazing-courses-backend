import { Injectable, HttpException, HttpStatus, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ITestData, ICourseTests, IGetTestData, IUpdateTest, IRemoveCourseTests, ICheckTest } from './testing.types';
import { type } from 'os';

export type Course = any;
export type User = any;
export type Testing = any;

@Injectable()
export class TestingService {
    constructor(
        @InjectModel('Course') private courseModel: Model<Course>,
        @InjectModel('User') private userModel: Model<User>,
        @InjectModel('Testing') private testingModel: Model<Testing>,
    ) { }

    async getAllTests(): Promise<any> {
        const tests = await this.testingModel.find();
        return tests;
    }

    async updateTest(updatedTest: IUpdateTest): Promise<any> {
        const course = await this.testingModel.findOne({ courseName: updatedTest.courseName });
        if (course) {
            const mappedCourseTests = course.courseTests.map(item => {
                if (item.lectureTitle === updatedTest.lectureTitle) {
                    return { lectureTitle: updatedTest.lectureTitle, lectureQuestions: updatedTest.lectureQuestions };
                } else {
                    return item;
                }
            });
            course.courseTests = mappedCourseTests;
            await course.save();

            const users = await this.userModel.find();
            users.forEach(async user => {
                const selectedCourse = user.courseProgress?.find(course => course.courseName === updatedTest.courseName);
                if (selectedCourse) {
                    selectedCourse.lecturesTesting = selectedCourse.lecturesTesting.filter(testing => testing.lectureTitle !== updatedTest.lectureTitle)
                }
                await user.save();
            });

            throw new HttpException({
                status: HttpStatus.OK,
                message: 'COURSE_TESTING_SUCCESSFULLY_UPDATED',
            }, HttpStatus.OK);
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'WRONG_COURSE_NAME',
            }, HttpStatus.FORBIDDEN);
        }
    }

    async getTestWatch(test: IGetTestData): Promise<any> {
        const course = await this.testingModel.findOne({ courseName: test.courseName });
        if (course) {
            const lectureData = course.courseTests.find((item) => item.lectureTitle === test.lectureTitle);
            return lectureData.lectureQuestions.map(item => {
                const transformedQuestion = item;
                transformedQuestion.answer = undefined;
                return transformedQuestion;
            })
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'WRONG_COURSE_NAME',
            }, HttpStatus.FORBIDDEN);
        }
    }

    async getAvailableLecturesTests(test: { courseName: string }): Promise<any> {
        const course: any = await this.testingModel.findOne(test);
        if (course) {
            return { courseTests: course.courseTests };
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'COURSE_NOT_FOUND',
            }, HttpStatus.FORBIDDEN);
        }
    }


    async getTestEdit(updatedTest: IGetTestData): Promise<any> {
        const course = await this.testingModel.findOne({ courseName: updatedTest.courseName });
        if (course) {
            const lectureData = course.courseTests.find((item) => item.lectureTitle === updatedTest.lectureTitle);
            return lectureData.lectureQuestions;
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'WRONG_COURSE_NAME',
            }, HttpStatus.FORBIDDEN);
        }
    }

    async checkTest(checkedTest: ICheckTest): Promise<any> {
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
                        const arr = item.lecturesTesting ? item.lecturesTesting.slice() : [];
                        arr.map((lec, index) => {
                            if (lec.lectureTitle === checkedTest.lectureTitle) {
                                item.lecturesTesting.splice(index, 1);
                            }
                        })
                        item.lecturesTesting.push({ lectureTitle: checkedTest.lectureTitle, answers: modifiedAnswers, result });
                    }
                });
                await user.save();
                return { result };
            } else {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    message: 'WRONG_USER',
                }, HttpStatus.NOT_FOUND);
            }
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'WRONG_COURSE_NAME',
            }, HttpStatus.FORBIDDEN);
        }
    }
}
