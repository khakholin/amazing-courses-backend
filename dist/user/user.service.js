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
let UserService = class UserService {
    constructor() {
        this.users = [
            { email: 'admin@admin.ru', login: 'admin', password: 'admin' },
            { email: 'khakholin@mail.ru', login: 'Alexander', password: '123456' },
            { email: 'fatykhov@google.com', login: 'Timur', password: '654321' },
        ];
        this.testUsers = [
            {
                userId: 1,
                username: 'john',
                password: 'changeme',
            },
            {
                userId: 2,
                username: 'chris',
                password: 'secret',
            },
            {
                userId: 3,
                username: 'maria',
                password: 'guess',
            },
        ];
    }
    authenticationUser(potentialUser) {
        return this.users.find((user) => ((user.login === potentialUser.login) && (user.password === potentialUser.password)));
    }
    recoveryPassword(recoveryData) {
        return this.users.find((user) => user.email === recoveryData.email);
    }
    registrationUser(newUser) {
        this.users.push(newUser);
    }
    async findOne(username) {
        return this.testUsers.find(user => user.username === username);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map