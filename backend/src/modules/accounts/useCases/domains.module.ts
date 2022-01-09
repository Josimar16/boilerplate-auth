import { forwardRef, Module } from "@nestjs/common";
import { MailsModule } from "../../../shared/container/providers/MailProvider/mails.module";
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
import { CreateUserAccessControlListController } from "./createUserAccessControlList/createUserAccessControlListController";
import { CreateUserAccessControlListUseCase } from "./createUserAccessControlList/createUserAccessControlListUseCase";
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
    CreateUserAccessControlListController,
    CreateUserAccessControlListUseCase
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
    CreateUserAccessControlListController,
  ]
})
export class DomainsModule { }