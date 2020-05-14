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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const users_data_1 = require("../users/data/users.data");
const users_types_1 = require("../users/users.types");
const users_service_1 = require("../users/users.service");
let RegistrationService = class RegistrationService {
    constructor(userService) {
        this.userService = userService;
        this.testUsers = users_data_1.userList;
    }
    registrationUser(newUser) {
        if (this.userService.findEmailDuplicate) {
            return { message: 'EMAIL_DUPLICATE' };
        }
        else {
            if (this.userService.findOne) {
                return { message: 'USER_DUPLICATE' };
            }
            else {
                this.testUsers.push({ email: newUser.email, username: newUser.login, password: newUser.password, userId: this.testUsers.length + 1, availableCourses: [] });
                return { message: 'SUCCESS' };
            }
        }
    }
};
RegistrationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UserService])
], RegistrationService);
exports.RegistrationService = RegistrationService;
//# sourceMappingURL=registration.service.js.map