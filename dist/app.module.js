"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const platform_express_1 = require("@nestjs/platform-express");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_service_1 = require("./auth/auth.service");
const course_controller_1 = require("./course/course.controller");
const course_schema_1 = require("./course/schemas/course.schema");
const course_service_1 = require("./course/course.service");
const auth_constants_1 = require("./auth/auth.constants");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const local_strategy_1 = require("./auth/local.strategy");
const registration_service_1 = require("./registration/registration.service");
const sendEmail_1 = require("./email/sendEmail");
const testing_controller_1 = require("./testing/testing.controller");
const testing_schema_1 = require("./testing/schemas/testing.schema");
const testing_service_1 = require("./testing/testing.service");
const users_controller_1 = require("./users/users.controller");
const user_schema_1 = require("./users/schemas/user.schema");
const users_service_1 = require("./users/users.service");
const welcome_controller_1 = require("./welcome/welcome.controller");
const welcome_service_1 = require("./welcome/welcome.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            jwt_1.JwtModule.register({
                secret: auth_constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '1w' },
            }),
            platform_express_1.MulterModule.register(),
            mongoose_1.MongooseModule.forRoot('mongodb://localhost/amazingCourses'),
            mongoose_1.MongooseModule.forFeature([{ name: 'Course', schema: course_schema_1.CourseSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Testing', schema: testing_schema_1.TestingSchema }]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            serve_static_1.ServeStaticModule.forRoot({ rootPath: path_1.join(__dirname, "../web") }),
        ],
        controllers: [
            app_controller_1.AppController,
            course_controller_1.CourseController,
            testing_controller_1.TestingController,
            users_controller_1.UserController,
            welcome_controller_1.WelcomeController,
        ],
        providers: [
            app_service_1.AppService,
            auth_service_1.AuthService,
            course_service_1.CourseService,
            jwt_strategy_1.JwtStrategy,
            local_strategy_1.LocalStrategy,
            registration_service_1.RegistrationService,
            sendEmail_1.SendMail,
            testing_service_1.TestingService,
            users_service_1.UserService,
            welcome_service_1.WelcomeService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map