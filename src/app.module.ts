import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { jwtConstants } from './auth/auth.constants';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { CoursesController } from './courses/courses.controller';
import { CoursesService } from './courses/courses.service';
import { RegistrationService } from './registration/registration.service';
import { UserController } from './users/users.controller';
import { UserService } from './users/users.service';
import { UserSchema } from './users/schemas/user.schema';
import { SendMail } from './email/sendEmail';
import { CourseSchema } from './courses/schemas/course.schema';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1w' },
    }),
    MongooseModule.forRoot('mongodb://localhost/amazingCourses'),
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, "../web") }),
  ],
  controllers: [
    AppController,
    CoursesController,
    UserController,
  ],
  providers: [
    AppService,
    AuthService,
    CoursesService,
    JwtStrategy,
    LocalStrategy,
    RegistrationService,
    SendMail,
    UserService,
  ],
})
export class AppModule { }
