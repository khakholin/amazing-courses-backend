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
const local_auth_guard_1 = require("../auth/local-auth.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const auth_service_1 = require("../auth/auth.service");
const courses_service_1 = require("../courses/courses.service");
const sendEmail_1 = require("../email/sendEmail");
const registration_service_1 = require("../registration/registration.service");
const users_service_1 = require("./users.service");
let UserController = class UserController {
    constructor(authService, coursesService, registrationService, usersService) {
        this.authService = authService;
        this.coursesService = coursesService;
        this.registrationService = registrationService;
        this.usersService = usersService;
    }
    async login(req) {
        return this.authService.login(req.user);
    }
    getProfile(req) {
        return req.user;
    }
    async getCourses(req) {
        return this.coursesService.getUserCourses(req.user.availableCourses);
    }
    async recoveryPassword(body) {
        return sendEmail_1.sendEmail(body.email);
    }
    async registrationUser(body) {
        return this.registrationService.registrationUser(body);
    }
    async testCreat(body) {
        return this.usersService.create({ email: body.email, username: body.login, password: body.password, userId: 0, availableCourses: [] });
    }
    async testRemove(body) {
        return this.usersService.remove({ email: body.email, username: body.login, password: body.password, });
    }
    async testFindAll() {
        return this.usersService.findAll();
    }
    async testRemoveAll() {
        return this.usersService.removeAll();
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
    common_1.Get('profile'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getProfile", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('courses'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCourses", null);
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
    common_1.Post('testcreate'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "testCreat", null);
__decorate([
    common_1.Post('testremove'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "testRemove", null);
__decorate([
    common_1.Get('testfindall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "testFindAll", null);
__decorate([
    common_1.Get('testremoveall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "testRemoveAll", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        courses_service_1.CoursesService,
        registration_service_1.RegistrationService,
        users_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=users.controller.js.map