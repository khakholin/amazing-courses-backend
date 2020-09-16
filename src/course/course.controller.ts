import { Body, Controller, Post, Get, HttpException, HttpStatus, UseGuards, Request, Param, Res, Header } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CourseService } from 'src/course/course.service';
import { join } from 'path';
import { ICourseData, IAddLectures, IMoveLectures } from './course.types';

@Controller('course')
export class CourseController {
    constructor(
        private coursesService: CourseService,
    ) { }

    @Get('video/:courseFolder/:lectureNumber')
    @Header('Content-Type', 'video/mp4')
    async getFile(@Param() params, @Res() res) {
        res.sendFile(join(__dirname, '../../videos/' + params.courseFolder + '/' + params.lectureNumber + '.mp4'));
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createCourse(@Body() body: ICourseData) {
        return this.coursesService.createCourse(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('add-lectures')
    async addLectures(@Body() body: IAddLectures) {
        return this.coursesService.addLectures(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('move-lectures')
    async moveLectures(@Body() body: IMoveLectures) {
        return this.coursesService.moveLectures(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('remove')
    async removeCourse(@Body() body: { courseName: string }) {
        return this.coursesService.removeCourse(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('lecture-remove')
    async removeCourseLecture(@Body() body: { courseName: string, lectureTitle: string }) {
        return this.coursesService.removeCourseLecture(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('list')
    async getAllCourses(@Request() req) {
        return this.coursesService.getAllCourses();
    }

    @UseGuards(JwtAuthGuard)
    @Get('data')
    async getCoursesData() {
        return this.coursesService.getCoursesData();
    }
}
