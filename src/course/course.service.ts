import { Injectable, HttpException, HttpStatus, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICourseData } from './course.types';

export type Course = any;
export type User = any;
export type Testing = any;

@Injectable()
export class CourseService {
    constructor(
        @InjectModel('Course') private courseModel: Model<Course>,
        @InjectModel('User') private userModel: Model<User>,
        @InjectModel('Testing') private testingModel: Model<Testing>,
    ) { }

    async getUserCourses(data) {
        let userCourses: Course[] = [];
        let totalNumOfLectures: number = 0;
        let totalTime: number = 0;
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
            } else {
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

    async getAllCourses(): Promise<any> {
        const courses = await this.courseModel.find();
        return courses.map((item) => item.courseName)
    }

    async getCoursesData(): Promise<any> {
        return await this.courseModel.find();
    }

    async getUserAvailableCourses(data): Promise<any> {
        const user = await this.userModel.findOne({ username: data.username });
        if (user) {
            return user.availableCourses;
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async getUserCourseProgress(data): Promise<any> {
        const user = await this.userModel.findOne({ username: data.username });
        if (user) {
            return user.courseProgress;
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async createCourse(newCourse: ICourseData): Promise<any> {
        if (await this.courseModel.findOne({ courseName: newCourse.courseName })) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'COURSE_DUPLICATE',
            }, HttpStatus.NOT_FOUND);
        } else {
            const createdCourse = new this.courseModel(newCourse);
            const createdCourseTesting = new this.testingModel({
                courseName: newCourse.courseName, numOfLectures: newCourse.numOfLectures,
                courseTests: newCourse.courseLectures.map(item => ({ lectureTitle: item.lectureTitle, lectureQuestions: [] })),
            });
            createdCourse.save();
            createdCourseTesting.save();
            throw new HttpException({
                status: HttpStatus.CREATED,
                message: 'SUCCESS',
            }, HttpStatus.CREATED);
        }
    }

    async removeCourse(data): Promise<any> {
        const course = await this.courseModel.findOne({ courseName: data.courseName });
        if (course) {
            await this.courseModel.deleteOne(course);
            throw new HttpException({
                status: HttpStatus.OK,
                message: 'COURSE_SUCCESSFULLY_REMOVED',
            }, HttpStatus.OK);
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'COURSE_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async changeUserAvailableCourses(data): Promise<any> {
        const user = await this.userModel.findOne({ username: data.username });
        let index = -1;
        if (user) {
            user.availableCourses.find((course, i) => {
                course === data.courseName ? index = i : index = index;
            })
            if (index !== -1) {
                user.availableCourses.splice(index, 1);
                await user.save();
                throw new HttpException({
                    status: HttpStatus.OK,
                    message: 'COURSE_SUCCESSFULLY_REMOVED',
                }, HttpStatus.OK);
            } else {
                user.availableCourses.push(data.courseName);
                await user.save();
                throw new HttpException({
                    status: HttpStatus.OK,
                    message: 'COURSE_SUCCESSFULLY_ADDED',
                }, HttpStatus.OK);
            }
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async changeUserLectureAvailable(data): Promise<any> {
        const user = await this.userModel.findOne({ username: data.username });
        let courseIndex = -1;
        if (user) {
            user.courseProgress.find((item, i) => {
                item.courseName === data.courseName ? courseIndex = i : courseIndex = courseIndex;
            })
            if (courseIndex !== -1) {
                let lectureIndex = -1;
                user.courseProgress[courseIndex].availableLectures.find((lecture, j) => {
                    lecture === data.availableLecture ? lectureIndex = j : lectureIndex;
                })
                if (lectureIndex !== -1) {
                    user.courseProgress[courseIndex].availableLectures.splice(lectureIndex, 1);
                    await user.save();
                    throw new HttpException({
                        status: HttpStatus.OK,
                        message: 'LECTURE_SUCCESSFULLY_SET_UNAVAILABLE',
                    }, HttpStatus.OK);
                } else {
                    user.courseProgress[courseIndex].availableLectures.push(data.availableLecture);
                    await user.save();
                    throw new HttpException({
                        status: HttpStatus.OK,
                        message: 'LECTURE_SUCCESSFULLY_SET_AVAILABLE',
                    }, HttpStatus.OK);
                }
            } else {
                user.courseProgress.push({ courseName: data.courseName, availableLectures: [data.availableLecture], checkedLectures: [] });
                await user.save();
                throw new HttpException({
                    status: HttpStatus.OK,
                    message: 'COURSE_PROGRESS_SUCCESSFULLY_ADDED',
                }, HttpStatus.OK);
            }
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async changeUserLectureChecked(data): Promise<any> {
        const user = await this.userModel.findOne({ username: data.username });
        let courseIndex = -1;
        if (user) {
            user.courseProgress.find((item, i) => {
                item.courseName === data.courseName ? courseIndex = i : courseIndex = courseIndex;
            })
            if (courseIndex !== -1) {
                let lectureIndex = -1;
                user.courseProgress[courseIndex].checkedLectures.find((lecture, j) => {
                    lecture === data.checkedLecture ? lectureIndex = j : lectureIndex;
                })
                if (lectureIndex !== -1) {
                    user.courseProgress[courseIndex].checkedLectures.splice(lectureIndex, 1);
                    await user.save();
                    throw new HttpException({
                        status: HttpStatus.OK,
                        message: 'LECTURE_SUCCESSFULLY_SET_UNCHECKED',
                    }, HttpStatus.OK);
                } else {
                    user.courseProgress[courseIndex].checkedLectures.push(data.checkedLecture);
                    await user.save();
                    throw new HttpException({
                        status: HttpStatus.OK,
                        message: 'LECTURE_SUCCESSFULLY_SET_CHECKED',
                    }, HttpStatus.OK);
                }
            } else {
                user.courseProgress.push({ courseName: data.courseName, checkedLectures: [data.checkedLecture], availableLectures: [] });
                await user.save();
                throw new HttpException({
                    status: HttpStatus.OK,
                    message: 'COURSE_PROGRESS_SUCCESSFULLY_ADDED',
                }, HttpStatus.OK);
            }
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }
}


