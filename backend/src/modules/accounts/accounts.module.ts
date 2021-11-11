import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './infra/typeorm/entities/User';
import { Role } from './infra/typeorm/entities/Role';
import { Permission } from './infra/typeorm/entities/Permission';
import { EnsureAuthenticate } from '../../shared/infra/http/middlewares/ensureAuthenticate';
import { ProfileRouter } from './infra/routes/profile.routes';
import { UsersRouter } from './infra/routes/users.routes';
import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';
import { BCryptHashProvider } from './providers/HashProvider/implementations/BCryptHashProvider';
import { CreateUserController } from './useCases/createUser/createUserController';
import { CreateUserUseCase } from './useCases/createUser/createUserUseCase';
import { ShowProfileUserController } from './useCases/showProfileUser/showProfileUserController';
import { ShowProfileUserUseCase } from './useCases/showProfileUser/showProfileUserUseCase';
import { jwtConstants } from '../../shared/infra/http/middlewares/constants';
import { NestJWTTokenProvider } from './providers/TokenProvider/implementations/NestJWTTokenProvider';
import { SessionsRouter } from './infra/routes/sessions.routes';
import { AuthenticateUserController } from './useCases/authenticateUser/authenticateUserController';
import { AuthenticateUserUseCase } from './useCases/authenticateUser/authenticateUserUseCase';
import { ForgotPasswordController } from './useCases/forgotPassword/forgotPasswordController';
import { ForgotPasswordUseCase } from '../accounts/useCases/forgotPassword/forgotPasswordUseCase';
import { PasswordRouter } from './infra/routes/password.routes';
import { UserTokensRepository } from './infra/typeorm/repositories/UserTokensRepository';
import { MailsModule } from '../../shared/container/providers/MailProvider/mails.module';
import { ResetPasswordUseCase } from './useCases/resetPassword/resetPasswordUseCase';
import { RefreshTokenUseCase } from './useCases/refreshToken/RefreshTokenUseCase';
import { PermissionsRouter } from './infra/routes/permissions.routes';
import { CreatePermissionController } from './useCases/createPermission/createPermissionController';
import { CreatePermissionUseCase } from './useCases/createPermission/createPermissionUseCase';
import { PermissionsRepository } from './infra/typeorm/repositories/PermssionsRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    forwardRef(() => MailsModule),
  ],
  controllers: [
    PasswordRouter,
    PermissionsRouter,
    ProfileRouter,
    SessionsRouter,
    UsersRouter,
  ],
  providers: [
    EnsureAuthenticate,
    CreateUserController,
    CreateUserUseCase,
    CreatePermissionController,
    CreatePermissionUseCase,
    ShowProfileUserUseCase,
    ShowProfileUserController,
    AuthenticateUserController,
    AuthenticateUserUseCase,
    ForgotPasswordUseCase,
    ForgotPasswordController,
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
    {
      provide: 'PermissionsRepository',
      inject: [PermissionsRepository],
      useClass: PermissionsRepository,
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
