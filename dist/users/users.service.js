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
const users_data_1 = require("./data/users.data");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
        this.testUsers = users_data_1.userList;
    }
    async findUser(userDto) {
        if (await this.userModel.findOne(userDto)) {
            return this.userModel.findOne(userDto);
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async create(createUserDto) {
        if (await this.userModel.findOne(createUserDto)) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: 'USER_DUPLICATE',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        else {
            const createdUser = new this.userModel(createUserDto);
            return createdUser.save();
        }
    }
    async remove(removeUserDto) {
        return this.userModel.deleteOne(removeUserDto);
    }
    async removeAll() {
        return this.userModel.deleteMany({});
    }
    async findAll() {
        return this.userModel.find().exec();
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map