import { CourseService } from 'src/course/course.service';
import { ICourseData, IAddLectures, IMoveLectures } from './course.types';
export declare class CourseController {
    private coursesService;
    constructor(coursesService: CourseService);
    getFile(params: any, res: any): Promise<void>;
    createCourse(body: ICourseData): Promise<any>;
    addLectures(body: IAddLectures): Promise<any>;
    moveLectures(body: IMoveLectures): Promise<any>;
    removeCourse(body: {
        courseName: string;
    }): Promise<any>;
    removeCourseLecture(body: {
        courseName: string;
        lectureTitle: string;
    }): Promise<any>;
    getAllCourses(req: any): Promise<any>;
    getCoursesData(): Promise<any>;
    loadImage(file: any): Promise<{
        originalname: any;
        filename: any;
    }>;
    getUserImage(body: any, res: any): Promise<void>;
}
