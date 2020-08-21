import { Body, Controller, Post, Get, HttpException, HttpStatus, UseGuards, Request, Param, Res, Header } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { join } from 'path';
import { ITestData, IGetTestData, IUpdateTest } from './testing.types';
import { TestingService } from './testing.service';

@Controller('testing')
export class TestingController {
    constructor(
        private testingService: TestingService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('courses-test')
    async getCoursesTests() {
        return this.testingService.getCoursesTests();
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updateTest(@Body() body: IUpdateTest) {
        return this.testingService.updateTest(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('data')
    async getTest(@Body() body: IGetTestData) {
        return this.testingService.getTest(body);
    }
}