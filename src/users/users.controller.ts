import { Body, Controller, Post, Get, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';

import { UserService } from './users.service';
import { IUserData, IUserRegData, IUserRecoveryData } from './users.types';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { CoursesService } from 'src/courses/courses.service';
import { sendEmail } from 'src/email/sendEmail';

@Controller('user')
export class UserController {
    constructor(
        private authService: AuthService,
        private usersService: UserService,
        private coursesService: CoursesService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Post('courses')
    async getCourses(@Request() req) {
        return this.coursesService.getUserCourses(req.user.availableCourses);
    }

    @Post('auth')
    async authenticationUser(@Body() body: IUserData): Promise<IUserRegData> {
        const response = this.usersService.authenticationUser(body);
        if (response) {
            return response;
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'INVALID_USER'
            }, HttpStatus.NOT_FOUND);
        }
    }

    @Post('recovery')
    async recoveryPassword(@Body() body: IUserRecoveryData) {
        return sendEmail(body.email);
    }

    @Post('reg')
    asyncregistrationUser(@Body() body: IUserRegData) {
        this.usersService.registrationUser(body);
    }

}
