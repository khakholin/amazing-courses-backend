import { CoursesService } from './courses.service';
import { IUserInformation, IUserData } from './courses.types';
export declare class CoursesController {
    private reportService;
    constructor(reportService: CoursesService);
    getReportList(body: IUserInformation): IUserData;
}
