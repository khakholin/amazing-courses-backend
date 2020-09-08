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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getAllUsernames() {
        const users = await this.userModel.find();
        if (users) {
            return users.map(user => user.email);
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'USERS_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getUserMentors(data) {
        const user = await this.userModel.findOne({ email: data.email });
        if (user) {
            return user.mentors;
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllUsers(roles) {
        if (roles.find(item => item === 'admin')) {
            const users = await this.userModel.find();
            for (const user of users) {
                user.password = undefined;
            }
            return users;
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'ACCESS_IS_DENIED',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async getUserData(data) {
        return await this.userModel.findOne({ email: data.email });
    }
    async changeUserMentors(data) {
        const user = await this.userModel.findOne({ email: data.email });
        if (user) {
            const arr = user.mentors;
            let isMentorAvailable = true;
            arr.map((item, index) => {
                if (item === data.mentor) {
                    user.mentors.splice(index, 1);
                    isMentorAvailable = false;
                }
            });
            if (isMentorAvailable) {
                user.mentors.push(data.mentor);
            }
            await user.save();
            throw new common_1.HttpException({
                status: common_1.HttpStatus.OK,
                message: 'USER_MENTORS_SUCCESSFULLY_UPDATED',
            }, common_1.HttpStatus.OK);
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    ;
    async getUserStudents(data) {
        const user = await this.userModel.findOne({ username: data.username });
        if (user) {
            if (data.roles.find(role => role === 'mentor')) {
                const users = await this.userModel.find();
                let students = [];
                for (const i of users) {
                    if (i.mentors.find(item => item === data.username)) {
                        students.push(i);
                    }
                    ;
                }
                return students.map(u => u.realName || u.realSurname ? ({ realName: u.realName, realSurname: u.realSurname }) : ({ email: u.email }));
            }
            else {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    message: 'ACCESS_IS_DENIED',
                }, common_1.HttpStatus.FORBIDDEN);
            }
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    ;
    async updateUserData(data) {
        const user = await this.userModel.findOne({ username: data.oldUserName });
        if (user) {
            user.realName = data.realName;
            user.realSurname = data.realSurname;
            user.school = data.school;
            user.university = data.university;
            user.username = data.newUserName;
            user.workPlace = data.workPlace;
            await user.save();
            throw new common_1.HttpException({
                status: common_1.HttpStatus.OK,
                message: 'USER_DATA_SUCCESSFULLY_UPDATED',
            }, common_1.HttpStatus.OK);
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateUserEmail(data) {
        const user = await this.userModel.findOne({ email: data.email, password: data.password });
        if (user) {
            user.email = data.newEmail;
            await user.save();
            throw new common_1.HttpException({
                status: common_1.HttpStatus.OK,
                message: 'USER_EMAIL_SUCCESSFULLY_UPDATED',
            }, common_1.HttpStatus.OK);
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'WRONG_PASSWORD',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async updateUserPassword(data) {
        const user = await this.userModel.findOne({ email: data.email, password: data.oldPassword });
        if (user) {
            user.password = data.newPassword;
            await user.save();
            throw new common_1.HttpException({
                status: common_1.HttpStatus.OK,
                message: 'USER_PASSWORD_SUCCESSFULLY_UPDATED',
            }, common_1.HttpStatus.OK);
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'WRONG_PASSWORD',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map