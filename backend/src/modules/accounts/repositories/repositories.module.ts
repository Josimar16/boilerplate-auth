import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Permission } from "../infra/typeorm/entities/Permission";
import { Role } from "../infra/typeorm/entities/Role";
import { User } from "../infra/typeorm/entities/User";

import { PermissionsRepository } from "../infra/typeorm/repositories/PermssionsRepository";
import { RolesRepository } from "../infra/typeorm/repositories/RolesRepository";
import { UsersRepository } from "../infra/typeorm/repositories/UsersRepository";
import { UserTokensRepository } from "../infra/typeorm/repositories/UserTokensRepository";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission]),
  ],
  providers: [
    {
      provide: 'UsersRepository',
      inject: [UsersRepository],
      useClass: UsersRepository,
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
    {
      provide: 'RolesRepository',
      inject: [RolesRepository],
      useClass: RolesRepository,
    },
  ],
  exports: [
    {
      provide: 'UsersRepository',
      inject: [UsersRepository],
      useClass: UsersRepository,
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
    {
      provide: 'RolesRepository',
      inject: [RolesRepository],
      useClass: RolesRepository,
    },
  ],
})
export class RepositoriesModule { }