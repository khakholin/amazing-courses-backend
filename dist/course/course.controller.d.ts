import { CourseService } from 'src/course/course.service';
import { ICourseData } from './course.types';
export declare class CourseController {
    private coursesService;
    constructor(coursesService: CourseService);
    getFile(params: any, res: any): Promise<void>;
    registrationUser(body: ICourseData): Promise<any>;
    getAllCourses(req: any): Promise<any>;
    getCoursesData(): Promise<any>;
}
