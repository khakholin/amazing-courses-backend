import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

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

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1w' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
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
    UserService,
  ],
})
export class AppModule { }
