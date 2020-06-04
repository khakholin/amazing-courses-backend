import { Model } from 'mongoose';
import { ICourseData } from './course.types';
export declare type Course = any;
export declare type User = any;
export declare class CourseService {
    private courseModel;
    private userModel;
    constructor(courseModel: Model<Course>, userModel: Model<User>);
    getUserCourses(data: any): Promise<{
        totalNumOfLectures: number;
        totalTime: number;
        courses: any[];
    }>;
    getAllCourses(): Promise<any>;
    getCoursesData(): Promise<any>;
    getUserAvailableCourses(data: any): Promise<any>;
    getUserCourseProgress(data: any): Promise<any>;
    createCourse(newCourse: ICourseData): Promise<any>;
    changeUserAvailableCourses(data: any): Promise<any>;
    changeUserLectureAvailable(data: any): Promise<any>;
    changeUserLectureChecked(data: any): Promise<any>;
}
