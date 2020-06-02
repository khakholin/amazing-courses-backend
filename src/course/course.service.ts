import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { courseList } from './data/courses.data';
import { ICourseData } from './course.types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export type Course = any;

@Injectable()
export class CourseService {
    private readonly courses: Course[];

    constructor(@InjectModel('Course') private courseModel: Model<Course>) {
        this.courses = courseList;
    }

    public getUserCourses(availableCourses) {
        let userCourses: Course[] = [];
        let totalNumOfLectures: number = 0;
        let totalTime: number = 0;

        availableCourses.map((availableCourse) => {
            this.courses.map((course) => {
                if (availableCourse.title === course.title) {
                    userCourses.push(course);
                    totalNumOfLectures += course.numOfLectures;
                    totalTime += course.time;
                }
            })
        });

        return { totalNumOfLectures, totalTime, data: userCourses };
    }

    async getAllCourses(): Promise<any> {
        const courses = await this.courseModel.find();
        return courses.map((item) => item.courseName)
    }

    async createCourse(newCourse: ICourseData): Promise<any> {
        if (await this.courseModel.findOne({ courseName: newCourse.courseName })) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'COURSE_DUPLICATE',
            }, HttpStatus.NOT_FOUND);
        } else {
            const createdCourse = new this.courseModel(newCourse);
            createdCourse.save();
            throw new HttpException({
                status: HttpStatus.CREATED,
                message: 'SUCCESS',
            }, HttpStatus.CREATED);
        }
    }
}


