import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { IUserInformation, IUserData } from './courses.types';

@Controller('user')
export class CoursesController {

    constructor(private reportService: CoursesService) {
    }

    @Post('authentication')
    getReportList(@Body() body: IUserInformation): IUserData {
        return this.reportService.getUserCourses(body);
    }
}
