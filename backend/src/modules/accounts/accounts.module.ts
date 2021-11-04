import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnsureAuthenticate } from '../../shared/infra/http/middlewares/ensureAuthenticate';
import { ProfileRouter } from './infra/routes/profile.routes';
import { UsersRouter } from './infra/routes/users.routes';
import { User } from './infra/typeorm/entities/User';
import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';
import { BCryptHashProvider } from './providers/HashProvider/implementations/BCryptHashProvider';
import { CreateUserUseCase } from './useCases/createUser/createUserUseCase';
import { ShowProfileUserUseCase } from './useCases/showProfileUser/showProfileUserUseCase';
import { jwtConstants } from '../../shared/infra/http/middlewares/constants';
import { NestJWTTokenProvider } from './providers/TokenProvider/implementations/NestJWTTokenProvider';
import { SessionsRouter } from './infra/routes/sessions.routes';
import { AuthenticateUserUseCase } from './useCases/authenticateUser/authenticateUserUseCase';
import { ForgotPasswordUseCase } from '../accounts/useCases/forgotPassword/forgotPasswordUseCase';
import { PasswordRouter } from './infra/routes/password.routes';
import { UserTokensRepository } from './infra/typeorm/repositories/UserTokensRepository';
import { MailsModule } from '../../shared/container/providers/MailProvider/mails.module';
import { ResetPasswordUseCase } from './useCases/resetPassword/resetPasswordUseCase';
import { RefreshTokenUseCase } from './useCases/refreshToken/RefreshTokenUseCase';
import { CreateUserController } from './useCases/createUser/createUserController';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    forwardRef(() => MailsModule),
  ],
  controllers: [
    ProfileRouter,
    UsersRouter,
    SessionsRouter,
    PasswordRouter
  ],
  providers: [
    EnsureAuthenticate,
    CreateUserUseCase,
    CreateUserController,
    ShowProfileUserUseCase,
    AuthenticateUserUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    RefreshTokenUseCase,
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
