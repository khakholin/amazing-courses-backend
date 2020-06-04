import { Body, Controller, Post, Get, HttpException, HttpStatus, UseGuards, Request, Param, Res, Header } from '@nestjs/common';

import { IUserRegData, IUserRecoveryData } from './users.types';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { CourseService } from 'src/course/course.service';
import { SendMail } from 'src/email/sendEmail';
import { RegistrationService } from 'src/registration/registration.service';
import { join } from 'path';
import { UserService } from './users.service';

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
    @Get('profile')
    async getProfile(@Request() req) {
        return req.user;
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
    @Get('list')
    async getAllUsers(@Request() req) {
        return this.userService.getAllUsers(req.user.role);
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
    @Post('change-courses')
    async changeUserAvailableCourses(@Body() body) {
        return this.coursesService.changeUserAvailableCourses(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('change-available-lecture')
    async changeUserLectureAvailable(@Body() body) {
        return this.coursesService.changeUserLectureAvailable(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('change-check-lecture')
    async changeUserLectureChecked(@Body() body) {
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

    @Post('recovery')
    async recoveryPassword(@Body() body: IUserRecoveryData) {
        return this.sendMail.recovery(body.email);
    }

    @Post('registration')
    async registrationUser(@Body() body: IUserRegData) {
        return this.registrationService.registrationUser(body);
    }
}
