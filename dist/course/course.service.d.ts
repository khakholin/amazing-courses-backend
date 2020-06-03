import { ICourseData } from './course.types';
import { Model } from 'mongoose';
export declare type Course = any;
export declare class CourseService {
    private courseModel;
    private readonly courses;
    constructor(courseModel: Model<Course>);
    getUserCourses(availableCourses: any): {
        totalNumOfLectures: number;
        totalTime: number;
        data: any[];
    };
    getAllCourses(): Promise<any>;
    createCourse(newCourse: ICourseData): Promise<any>;
}
