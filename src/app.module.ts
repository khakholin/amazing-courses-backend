import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/auth.constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesController } from './courses/courses.controller';
import { CoursesService } from './courses/courses.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { LocalStrategy } from './auth/local.strategy';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1w' },
    }),
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
    LocalStrategy,
    JwtStrategy,
    UserService,
  ],
})
export class AppModule { }
