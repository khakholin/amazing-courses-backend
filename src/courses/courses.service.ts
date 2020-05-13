import { Injectable } from '@nestjs/common';

import { courseList } from './data/courses.data';

export type Course = any;

@Injectable()
export class CoursesService {
    private readonly courses: Course[];

    constructor() {
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
}


