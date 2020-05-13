import { Injectable } from '@nestjs/common';

import { courseList } from './data/courses.data';

export type Course = any;

@Injectable()
export class CoursesService {
    private readonly courses: Course[];

    constructor() {
        this.courses = courseList;
    }

    public getUserCourses(availableCourses: string[]) {
        let userCourses: Course[] = [];
        availableCourses.map((availableCourse) => {
            this.courses.map((course) => {
                if (availableCourse === course.title) {
                    userCourses.push(course)
                }
            })
        })

        return userCourses;
    }
}


