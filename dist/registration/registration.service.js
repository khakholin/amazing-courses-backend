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
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const users_types_1 = require("../users/users.types");
let RegistrationService = class RegistrationService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async registrationUser(newUser) {
        if (newUser.email && newUser.password && newUser.realName && newUser.realSurname) {
            if (await this.userModel.findOne({ email: newUser.email.toLowerCase() })) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'EMAIL_DUPLICATE',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                const createdUser = new this.userModel(newUser);
                createdUser.email = createdUser.email.toLowerCase();
                createdUser.save();
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.CREATED,
                    message: 'SUCCESS',
                }, common_1.HttpStatus.CREATED);
            }
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'INCORRECT_DATA',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
};
RegistrationService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], RegistrationService);
exports.RegistrationService = RegistrationService;
//# sourceMappingURL=registration.service.js.map