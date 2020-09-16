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
const local_auth_guard_1 = require("../auth/local-auth.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const auth_service_1 = require("../auth/auth.service");
const course_service_1 = require("../course/course.service");
const sendEmail_1 = require("../email/sendEmail");
const registration_service_1 = require("../registration/registration.service");
const path_1 = require("path");
const users_service_1 = require("./users.service");
const platform_express_1 = require("@nestjs/platform-express");
let UserController = class UserController {
    constructor(authService, coursesService, registrationService, sendMail, userService) {
        this.authService = authService;
        this.coursesService = coursesService;
        this.registrationService = registrationService;
        this.sendMail = sendMail;
        this.userService = userService;
    }
    async login(req) {
        return this.authService.login(req.user);
    }
    async changeRoles(body) {
        return this.userService.changeRoles(body);
    }
    async loadImage(file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }
    async getAllUsernames() {
        return this.userService.getAllUsernames();
    }
    async getUserMentors(body) {
        return this.userService.getUserMentors(body);
    }
    async getUserData(body) {
        return this.userService.getUserData(body);
    }
    async getCourses(body) {
        return this.coursesService.getUserCourses(body);
    }
    async getTestingProgress(body) {
        return this.coursesService.getTestingProgress(body);
    }
    async getAllUsers(body) {
        return this.userService.getAllUsers(body);
    }
    async getUserAvailableCourses(body) {
        return this.coursesService.getUserAvailableCourses(body);
    }
    async getUserCourseProgress(body) {
        return this.coursesService.getUserCourseProgress(body);
    }
    async changeUserMentors(body) {
        return this.userService.changeUserMentors(body);
    }
    async changeUserAvailableCourses(body) {
        return this.coursesService.changeUserAvailableCourses(body);
    }
    async changeUserLectureAvailable(body) {
        return this.coursesService.changeUserLectureAvailable(body);
    }
    async changeUserLectureChecked(body) {
        return this.coursesService.changeUserLectureChecked(body);
    }
    async updateUserData(body) {
        return this.userService.updateUserData(body);
    }
    async updateUserEmail(body) {
        return this.userService.updateUserEmail(body);
    }
    async updateUserPassword(body) {
        return this.userService.updateUserPassword(body);
    }
    async recoveryPassword(body) {
        return this.sendMail.recovery(body.email);
    }
    async registrationUser(body) {
        return this.registrationService.registrationUser(body);
    }
    async getUserStudents(body) {
        return this.userService.getUserStudents(body);
    }
};
__decorate([
    common_1.UseGuards(local_auth_guard_1.LocalAuthGuard),
    common_1.Post('auth/login'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('change-roles'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeRoles", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('load-image'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('userImage', {
        storage: multer_1.diskStorage({
            destination: path_1.join(__dirname, "../../files"),
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        })
    })),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loadImage", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('get-users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsernames", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('mentors'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserMentors", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('data'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserData", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('courses'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCourses", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('testing-progress'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getTestingProgress", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('list'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('available-courses'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserAvailableCourses", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('course-progress'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserCourseProgress", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('change-mentors'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeUserMentors", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('change-courses'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeUserAvailableCourses", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('change-available-lecture'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeUserLectureAvailable", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('change-check-lecture'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeUserLectureChecked", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('data-update'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserData", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('email-update'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserEmail", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('password-update'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserPassword", null);
__decorate([
    common_1.Post('recovery'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "recoveryPassword", null);
__decorate([
    common_1.Post('registration'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registrationUser", null);
__decorate([
    common_1.Post('get-students'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserStudents", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        course_service_1.CourseService,
        registration_service_1.RegistrationService,
        sendEmail_1.SendMail,
        users_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=users.controller.js.map