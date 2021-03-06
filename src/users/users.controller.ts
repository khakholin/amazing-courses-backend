import { Body, Controller, Post, Get, HttpException, HttpStatus, UseGuards, Request, Param, Res, Header, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer'

import { IUserRegData, IUserRecoveryData, IUserTestingProgress, IUserStudents, IUserRoles, IChangeRoles, IChangeLectureStatus, IChangeAvailableCourses } from './users.types';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { CourseService } from 'src/course/course.service';
import { SendMail } from 'src/email/sendEmail';
import { RegistrationService } from 'src/registration/registration.service';
import { join } from 'path';
import { UserService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    constructor(
        private authService: AuthService,
        private coursesService: CourseService,
        private registrationService: RegistrationService,
        private sendMail: SendMail,
        private userService: UserService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('change-roles')
    async changeRoles(@Body() body: IChangeRoles) {
        return this.userService.changeRoles(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('load-image')
    @UseInterceptors(FileInterceptor('userImage', {
        storage: diskStorage({
            destination: join(__dirname, "../../../files"),
            filename: (req, file, cb) => {
                cb(null, req.user.email)
            }
        })
    }))
    async loadImage(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-image')
    @Header('Content-Type', 'image/png')
    async getImage(@Req() req, @Res() res) {
        const fs = require('fs');
        const path = join(__dirname, '../../../files/' + req.user.email);
        if (fs.existsSync(path)) {
            res.sendFile(path);
        } else {
            res.set('Content-Type', 'text/html').status(404).send(
                new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    message: 'USER_IMAGE_NOT_FOUND',
                }, HttpStatus.NOT_FOUND)
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('get-user-image')
    @Header('Content-Type', 'image/png')
    async getUserImage(@Body() body, @Res() res) {
        const fs = require('fs');
        const path = join(__dirname, '../../../files/' + body.email);
        if (fs.existsSync(path)) {
            res.sendFile(path);
        } else {
            res.set('Content-Type', 'text/html').status(404).send(
                new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    message: 'USER_IMAGE_NOT_FOUND',
                }, HttpStatus.NOT_FOUND)
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-users')
    async getAllUsernames() {
        return this.userService.getAllUsernames();
    }

    @UseGuards(JwtAuthGuard)
    @Post('mentors')
    async getUserMentors(@Body() body) {
        return this.userService.getUserMentors(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('data')
    async getUserData(@Body() body) {
        return this.userService.getUserData(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('courses')
    async getCourses(@Body() body) {
        return this.coursesService.getUserCourses(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('testing-progress')
    async getTestingProgress(@Body() body: IUserTestingProgress) {
        return this.coursesService.getTestingProgress(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('list')
    async getAllUsers(@Body() body: { email: string }) {
        return this.userService.getAllUsers(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('available-courses')
    async getUserAvailableCourses(@Body() body) {
        return this.coursesService.getUserAvailableCourses(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('course-progress')
    async getUserCourseProgress(@Body() body) {
        return this.coursesService.getUserCourseProgress(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('change-mentors')
    async changeUserMentors(@Body() body) {
        return this.userService.changeUserMentors(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('change-courses')
    async changeUserAvailableCourses(@Body() body: IChangeAvailableCourses) {
        return this.coursesService.changeUserAvailableCourses(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('change-available-lecture')
    async changeUserLectureAvailable(@Body() body: IChangeLectureStatus) {
        return this.coursesService.changeUserLectureAvailable(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('change-check-lecture')
    async changeUserLectureChecked(@Body() body: IChangeLectureStatus) {
        return this.coursesService.changeUserLectureChecked(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('data-update')
    async updateUserData(@Body() body) {
        return this.userService.updateUserData(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('email-update')
    async updateUserEmail(@Body() body) {
        return this.userService.updateUserEmail(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('password-update')
    async updateUserPassword(@Body() body) {
        return this.userService.updateUserPassword(body);
    }

    @Post('recovery')
    async recoveryPassword(@Body() body: IUserRecoveryData) {
        return this.sendMail.recovery(body.email);
    }

    @Post('registration')
    async registrationUser(@Body() body: IUserRegData) {
        return this.registrationService.registrationUser(body);
    }

    @Post('get-students')
    async getUserStudents(@Body() body: IUserStudents) {
        return this.userService.getUserStudents(body);
    }
}
