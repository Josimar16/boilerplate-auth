import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnsureAuthenticate } from 'src/shared/infra/http/middlewares/ensureAuthenticate';
import { ProfileController } from './infra/controllers/profile.controller';
import { UsersController } from './infra/controllers/users.controller';
import { User } from './infra/typeorm/entities/User';
import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';
import { BCryptHashProvider } from './providers/HashProvider/implementations/BCryptHashProvider';
import { CreateUserUseCase } from './useCases/createUser/createUserUseCase';
import { ShowProfileUserUseCase } from './useCases/showProfileUser/showProfileUserUseCase';
import { jwtConstants } from '../../shared/infra/http/middlewares/constants';
import { NestJWTTokenProvider } from './providers/TokenProvider/implementations/NestJWTTokenProvider';
import { SessionsController } from './infra/controllers/sessions.controller';
import { AuthenticateUserUseCase } from './useCases/authenticateUser/authenticateUserUseCase';
import { ForgotPasswordUseCase } from '../accounts/useCases/forgotPassword/forgotPasswordUseCase';
import { PasswordController } from './infra/controllers/password.controller';
import { UserTokensRepository } from './infra/typeorm/repositories/UserTokensRepository';
import { MailsModule } from 'src/shared/container/providers/MailProvider/mails.module';
import { ResetPasswordUseCase } from './useCases/resetPassword/resetPasswordUseCase';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    forwardRef(() => MailsModule),
  ],
  controllers: [
    ProfileController,
    UsersController,
    SessionsController,
    PasswordController
  ],
  providers: [
    EnsureAuthenticate,
    CreateUserUseCase,
    ShowProfileUserUseCase,
    AuthenticateUserUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    {
      provide: 'UsersRepository',
      inject: [UsersRepository],
      useClass: UsersRepository,
    },
    {
      provide: 'HashProvider',
      inject: [BCryptHashProvider],
      useClass: BCryptHashProvider,
    },
    {
      provide: 'TokenProvider',
      inject: [NestJWTTokenProvider],
      useClass: NestJWTTokenProvider,
    },
    {
      provide: 'UserTokensRepository',
      inject: [UserTokensRepository],
      useClass: UserTokensRepository,
    },
  ],
  exports: [
    JwtModule,
    {
      provide: 'UsersRepository',
      inject: [UsersRepository],
      useClass: UsersRepository,
    },
  ],
})
export class AccountsModule { }
