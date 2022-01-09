import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IPermissionsRepository } from "../../repositories/IPermissionsRepository";
import { IRolesRepository } from "../../repositories/IRolesRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserModel } from "../../repositories/models/IUserModel";

interface UserACLRequest {
  user_id: string;
  roles: string[];
  permissions: string[];
}

@Injectable()
export class CreateUserAccessControlListUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @Inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @Inject('PermissonsRepository')
    private permissionsRepository: IPermissionsRepository
  ) { }
  public async execute({
    user_id,
    roles,
    permissions
  }: UserACLRequest): Promise<IUserModel> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new NotFoundException({
      title: 'Falha ao cadastrar!',
      message: 'Usuário não existe!',
      data: null,
      cod: 'not.found'
    });

    const permissionsExists = await this.permissionsRepository.findByIds(permissions);

    const rolesExists = await this.rolesRepository.findByIds(roles);

    user.permissions = permissionsExists;
    user.roles = rolesExists;

    await this.usersRepository.save(user);

    return user;
  }
}