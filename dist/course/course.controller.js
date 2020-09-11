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
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const course_service_1 = require("./course.service");
const path_1 = require("path");
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
CourseController = __decorate([
    common_1.Controller('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map