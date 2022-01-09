import { forwardRef, Module } from "@nestjs/common";
import { MailsModule } from "../../../shared/container/providers/MailProvider/mails.module";
import { UserLogged } from "../../../shared/infra/http/middlewares/UserLogged";
import { ProvidersModule } from "../providers/providers.module";
import { RepositoriesModule } from "../repositories/repositories.module";

import { AuthenticateUserController } from "./authenticateUser/authenticateUserController";
import { AuthenticateUserUseCase } from "./authenticateUser/authenticateUserUseCase";
import { CreatePermissionController } from "./createPermission/createPermissionController";
import { CreatePermissionUseCase } from "./createPermission/createPermissionUseCase";
import { CreateRoleController } from "./createRole/createRoleController";
import { CreateRoleUseCase } from "./createRole/createRoleUseCase";
import { CreateUserController } from "./createUser/createUserController";
import { CreateUserUseCase } from "./createUser/createUserUseCase";
import { ForgotPasswordController } from "./forgotPassword/forgotPasswordController";
import { ForgotPasswordUseCase } from "./forgotPassword/forgotPasswordUseCase";
import { RefreshTokenController } from "./refreshToken/refreshTokenController";
import { RefreshTokenUseCase } from "./refreshToken/refreshTokenUseCase";
import { ResetPasswordController } from "./resetPassword/resetPasswordController";
import { ResetPasswordUseCase } from "./resetPassword/resetPasswordUseCase";
import { ShowProfileUserController } from "./showProfileUser/showProfileUserController";
import { ShowProfileUserUseCase } from "./showProfileUser/showProfileUserUseCase";

@Module({
  imports: [
    RepositoriesModule,
    ProvidersModule,
    forwardRef(() => MailsModule)
  ],
  providers: [
    CreateUserController,
    CreateUserUseCase,
    ShowProfileUserUseCase,
    ShowProfileUserController,
    AuthenticateUserController,
    AuthenticateUserUseCase,
    ForgotPasswordUseCase,
    ForgotPasswordController,
    ResetPasswordController,
    ResetPasswordUseCase,
    RefreshTokenController,
    RefreshTokenUseCase,
    CreatePermissionController,
    CreatePermissionUseCase,
    CreateRoleController,
    CreateRoleUseCase,
  ],
  exports: [
    CreateUserController,
    ShowProfileUserController,
    AuthenticateUserController,
    ForgotPasswordController,
    CreatePermissionController,
    CreateRoleController,
    RefreshTokenController,
    ResetPasswordController,
  ]
})
export class DomainsModule { }