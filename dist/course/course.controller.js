"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const course_service_1 = require("./course.service");
const path_1 = require("path");
const platform_express_1 = require("@nestjs/platform-express");
let CourseController = class CourseController {
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    async getFile(params, res) {
        res.sendFile(path_1.join(__dirname, '../../videos/' + params.courseFolder + '/' + params.lectureNumber + '.mp4'));
    }
    async createCourse(body) {
        return this.coursesService.createCourse(body);
    }
    async addLectures(body) {
        return this.coursesService.addLectures(body);
    }
    async moveLectures(body) {
        return this.coursesService.moveLectures(body);
    }
    async removeCourse(body) {
        return this.coursesService.removeCourse(body);
    }
    async removeCourseLecture(body) {
        return this.coursesService.removeCourseLecture(body);
    }
    async getAllCourses(req) {
        return this.coursesService.getAllCourses();
    }
    async getCoursesData() {
        return this.coursesService.getCoursesData();
    }
    async loadImage(file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }
    async getUserImage(body, res) {
        const fs = require('fs');
        const path = path_1.join(__dirname, '../../../files/' + body.fileName);
        if (fs.existsSync(path)) {
            res.sendFile(path);
        }
        else {
            res.set('Content-Type', 'text/html').status(404).send(new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'TESTING_IMAGE_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND));
        }
    }
};
__decorate([
    common_1.Get('video/:courseFolder/:lectureNumber'),
    common_1.Header('Content-Type', 'video/mp4'),
    __param(0, common_1.Param()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getFile", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('create'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('add-lectures'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addLectures", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('move-lectures'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "moveLectures", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('remove'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "removeCourse", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('lecture-remove'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "removeCourseLecture", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('list'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getAllCourses", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCoursesData", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('load-image'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('testingImage', {
        storage: multer_1.diskStorage({
            destination: path_1.join(__dirname, "../../../files"),
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        })
    })),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "loadImage", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('get-image'),
    common_1.Header('Content-Type', 'image/png'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getUserImage", null);
CourseController = __decorate([
    common_1.Controller('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map