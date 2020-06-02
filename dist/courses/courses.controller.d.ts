import { CoursesService } from 'src/courses/courses.service';
export declare class CourseController {
    private coursesService;
    constructor(coursesService: CoursesService);
    getFile(params: any, res: any): Promise<void>;
}
