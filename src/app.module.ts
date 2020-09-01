import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CourseController } from './course/course.controller';
import { CourseSchema } from './course/schemas/course.schema';
import { CourseService } from './course/course.service';
import { jwtConstants } from './auth/auth.constants';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { RegistrationService } from './registration/registration.service';
import { SendMail } from './email/sendEmail';
import { TestingController } from './testing/testing.controller';
import { TestingSchema } from './testing/schemas/testing.schema';
import { TestingService } from './testing/testing.service';
import { UserController } from './users/users.controller';
import { UserSchema } from './users/schemas/user.schema';
import { UserService } from './users/users.service';
import { WelcomeController } from './welcome/welcome.controller';
import { WelcomeService } from './welcome/welcome.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1w' },
    }),
    MongooseModule.forRoot('mongodb://localhost/amazingCourses'),
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Testing', schema: TestingSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, "../web") }),
  ],
  controllers: [
    AppController,
    CourseController,
    TestingController,
    UserController,
    WelcomeController,
  ],
  providers: [
    AppService,
    AuthService,
    CourseService,
    JwtStrategy,
    LocalStrategy,
    RegistrationService,
    SendMail,
    TestingService,
    UserService,
    WelcomeService,
  ],
})
export class AppModule { }
