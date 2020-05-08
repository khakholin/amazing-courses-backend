"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
};
UserService = __decorate([
    common_1.Injectable()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map