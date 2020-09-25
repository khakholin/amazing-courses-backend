import { Injectable, HttpException, HttpStatus, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as arrayMove from 'array-move';

import { ICourseData, IAddLectures, IMoveLectures } from './course.types';
import { IUserTestingProgress, IChangeLectureStatus, IChangeAvailableCourses } from 'src/users/users.types';

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

    async getTestingProgress(data: IUserTestingProgress) {
        const user = await this.userModel.findOne({ email: data.email });
        if (user) {
            let soughtProgress;
            user.courseProgress.map(item => {
                if (item.courseName === data.courseName) {
                    soughtProgress = item.lecturesTesting.find(lec => lec.lectureTitle === data.lectureTitle);
                }
            })
            if (soughtProgress.answers.length) {
                return soughtProgress;
            } else {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    message: 'COURSE_PROGRESS_NOT_FOUND',
                }, HttpStatus.NOT_FOUND);
            }
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async getAllCourses(): Promise<any> {
        const courses = await this.courseModel.find();
        return courses.map((item) => item.courseName)
    }

    async getCoursesData(): Promise<any> {
        return await this.courseModel.find();
    }

    async getUserAvailableCourses(data): Promise<any> {
        const user = await this.userModel.findOne({ email: data.email });
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
        const user = await this.userModel.findOne({ email: data.email });
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
                courseName: newCourse.courseName,
                numOfLectures: newCourse.numOfLectures,
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

    async addLectures(data: IAddLectures): Promise<any> {
        const course = await this.courseModel.findOne({ courseName: data.courseName });
        const courseTesting = await this.testingModel.findOne({ courseName: data.courseName });
        if (course) {
            course.courseLectures = course.courseLectures?.concat(data.courseLectures);
            course.numOfLectures = (+(course.numOfLectures) + +(data.courseLectures.length)).toString();
            let newLecturesTime = 0;
            data.courseLectures?.map(item => newLecturesTime += +(item.lectureTime))
            course.courseTime = (+(course.courseTime) + newLecturesTime);
            await course.save();

            courseTesting.courseTests = courseTesting?.courseTests.concat(data.courseLectures.map(item => ({ lectureTitle: item.lectureTitle, lectureQuestions: [] })));
            courseTesting.numOfLectures = (+(course.numOfLectures) + +(data.courseLectures.length)).toString();
            await courseTesting.save();
            return course;
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'COURSE_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async moveLectures(data: IMoveLectures): Promise<any> {
        const course = await this.courseModel.findOne({ courseName: data.courseName });
        const courseTesting = await this.testingModel.findOne({ courseName: data.courseName });
        if (course) {
            course.courseLectures = arrayMove(course.courseLectures, data.oldIndex, data.newIndex);
            await course.save();

            courseTesting.courseTests = arrayMove(courseTesting.courseTests, data.oldIndex, data.newIndex);
            await courseTesting.save();
            return course;
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'COURSE_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async removeCourse(data: { courseName: string }): Promise<any> {
        const course = await this.courseModel.findOne({ courseName: data.courseName });
        if (course) {
            await this.courseModel.deleteOne({ courseName: data.courseName });
            const courseTesting = await this.testingModel.findOne({ courseName: data.courseName });
            if (courseTesting) {
                await this.testingModel.deleteOne({ courseName: data.courseName });
                const users = await this.userModel.find();
                users.forEach(async user => {
                    user.availableCourses = user.availableCourses?.filter(course => course !== data.courseName);
                    user.courseProgress = user.courseProgress?.filter(course => course.courseName !== data.courseName);
                    await user.save();
                });
                throw new HttpException({
                    status: HttpStatus.OK,
                    message: 'COURSE_AND_TEST_SUCCESSFULLY_REMOVED',
                }, HttpStatus.OK);
            } else {
                throw new HttpException({
                    status: HttpStatus.OK,
                    message: 'COURSE_SUCCESSFULLY_REMOVED',
                }, HttpStatus.OK);
            }
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'COURSE_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async removeCourseLecture(data: { courseName: string, lectureTitle: string }): Promise<any> {
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
        users.forEach(async user => {
            const selectedCourse = user.courseProgress?.find(course => course.courseName === data.courseName);
            if (selectedCourse) {
                selectedCourse.lecturesTesting = selectedCourse.lecturesTesting.filter(testing => testing.lectureTitle !== data.lectureTitle);
                isRemovedData++;
            }
            await user.save();
        });
        if (isRemovedData) {
            return await this.courseModel.find();
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'LECTURE_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async changeUserAvailableCourses(data: IChangeAvailableCourses): Promise<any> {
        const user = await this.userModel.findOne({ email: data.email });
        let index = -1;
        if (user) {
            user.availableCourses.find((course, i) => {
                course === data.courseName ? index = i : index = index;
            });
            if (index !== -1) {
                user.availableCourses.splice(index, 1);
                user.courseProgress.map(async progress => {
                    if (progress.courseName === data.courseName) {

                        progress.availableLectures = [];
                        progress.checkedLectures = [];
                        progress.lecturesTesting = [];

                    }
                });
                await user.save();
                throw new HttpException({
                    status: HttpStatus.OK,
                    message: 'COURSE_SUCCESSFULLY_REMOVED',
                }, HttpStatus.OK);
            } else {
                user.availableCourses.push(data.courseName);
                const course = await this.courseModel.findOne({ courseName: data.courseName });
                user.courseProgress.push({
                    courseName: data.courseName,
                    availableLectures: [],
                    checkedLectures: [],
                    lecturesTesting: course.courseLectures.map(item => {
                        return { lectureTitle: item.lectureTitle, answers: [], result: {} };
                    })
                });
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

    async changeUserLectureAvailable(data: IChangeLectureStatus): Promise<any> {
        const user = await this.userModel.findOne({ email: data.email });
        let courseIndex = -1;
        if (user) {
            user.courseProgress.find((item, i) => {
                item.courseName === data.courseName ? courseIndex = i : courseIndex = courseIndex;
            })
            if (courseIndex !== -1) {
                let lectureIndex = -1;
                user.courseProgress[courseIndex].availableLectures.find((lecture, j) => {
                    lecture === data.lectureTitle ? lectureIndex = j : lectureIndex;
                })
                if (lectureIndex !== -1) {
                    user.courseProgress[courseIndex].availableLectures.splice(lectureIndex, 1);
                    await user.save();
                    throw new HttpException({
                        status: HttpStatus.OK,
                        message: 'LECTURE_SUCCESSFULLY_SET_UNAVAILABLE',
                    }, HttpStatus.OK);
                } else {
                    user.courseProgress[courseIndex].availableLectures.push(data.lectureTitle);
                    await user.save();
                    throw new HttpException({
                        status: HttpStatus.OK,
                        message: 'LECTURE_SUCCESSFULLY_SET_AVAILABLE',
                    }, HttpStatus.OK);
                }
            } else {
                user.courseProgress.push({ courseName: data.courseName, availableLectures: [data.lectureTitle], checkedLectures: [] });
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

    async changeUserLectureChecked(data: IChangeLectureStatus): Promise<any> {
        const user = await this.userModel.findOne({ email: data.email });
        let courseIndex = -1;
        if (user) {
            user.courseProgress.find((item, i) => {
                item.courseName === data.courseName ? courseIndex = i : courseIndex = courseIndex;
            })
            if (courseIndex !== -1) {
                let lectureIndex = -1;
                user.courseProgress[courseIndex].checkedLectures.find((lecture, j) => {
                    lecture === data.lectureTitle ? lectureIndex = j : lectureIndex;
                })
                if (lectureIndex !== -1) {
                    user.courseProgress[courseIndex].checkedLectures.splice(lectureIndex, 1);
                    await user.save();
                    throw new HttpException({
                        status: HttpStatus.OK,
                        message: 'LECTURE_SUCCESSFULLY_SET_UNCHECKED',
                    }, HttpStatus.OK);
                } else {
                    user.courseProgress[courseIndex].checkedLectures.push(data.lectureTitle);
                    await user.save();
                    throw new HttpException({
                        status: HttpStatus.OK,
                        message: 'LECTURE_SUCCESSFULLY_SET_CHECKED',
                    }, HttpStatus.OK);
                }
            } else {
                user.courseProgress.push({ courseName: data.courseName, checkedLectures: [data.lectureTitle], availableLectures: [] });
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


