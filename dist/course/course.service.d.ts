import { Model } from 'mongoose';
import { ICourseData, IAddLectures } from './course.types';
import { IUserTestingProgress, IChangeLectureStatus, IChangeAvailableCourses } from 'src/users/users.types';
export declare type Course = any;
export declare type User = any;
export declare type Testing = any;
export declare class CourseService {
    private courseModel;
    private userModel;
    private testingModel;
    constructor(courseModel: Model<Course>, userModel: Model<User>, testingModel: Model<Testing>);
    getUserCourses(data: any): Promise<{
        totalNumOfLectures: number;
        totalTime: number;
        courses: any[];
    }>;
    getTestingProgress(data: IUserTestingProgress): Promise<any>;
    getAllCourses(): Promise<any>;
    getCoursesData(): Promise<any>;
    getUserAvailableCourses(data: any): Promise<any>;
    getUserCourseProgress(data: any): Promise<any>;
    createCourse(newCourse: ICourseData): Promise<any>;
    addLectures(data: IAddLectures): Promise<any>;
    removeCourse(data: {
        courseName: string;
    }): Promise<any>;
    removeCourseLecture(data: {
        courseName: string;
        lectureTitle: string;
    }): Promise<any>;
    changeUserAvailableCourses(data: IChangeAvailableCourses): Promise<any>;
    changeUserLectureAvailable(data: IChangeLectureStatus): Promise<any>;
    changeUserLectureChecked(data: IChangeLectureStatus): Promise<any>;
}
