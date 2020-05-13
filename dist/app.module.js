"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("./auth/auth.constants");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const courses_controller_1 = require("./courses/courses.controller");
const courses_service_1 = require("./courses/courses.service");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const local_strategy_1 = require("./auth/local.strategy");
const auth_service_1 = require("./auth/auth.service");
const jwt_strategy_1 = require("./auth/jwt.strategy");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: auth_constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '1w' },
            }),
        ],
        controllers: [
            app_controller_1.AppController,
            courses_controller_1.CoursesController,
            user_controller_1.UserController,
        ],
        providers: [
            app_service_1.AppService,
            auth_service_1.AuthService,
            courses_service_1.CoursesService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            user_service_1.UserService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map