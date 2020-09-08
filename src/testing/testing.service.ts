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

    // тестовый метод, не будет на проде
    async getCoursesTests(): Promise<any> {
        return await this.testingModel.find();
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

    async getTestWatch(updatedTest: IGetTestData): Promise<any> {
        const course = await this.testingModel.findOne({ courseName: updatedTest.courseName });
        if (course) {
            const lectureData = course.courseTests.find((item) => item.lectureTitle === updatedTest.lectureTitle);
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
                        })
                        item.lecturesTesting.push({ lectureTitle: checkedTest.lectureTitle, answers: checkedTest.lectureAnswers, percent: percent.toString() });
                    }
                });
                await user.save();
                return percent.toString();
            } else {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    message: 'WRONG_USERNAME',
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
